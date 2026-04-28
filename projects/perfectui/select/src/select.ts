import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  EmbeddedViewRef,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  SelectChangeEvent,
  SelectFlatRow,
  SelectOpenChangeEvent,
  SelectOption,
  SelectOptionGroup,
  SelectOptionLike,
  SelectPlacement,
  SelectSize,
  SelectStatus,
  SelectTheme,
} from './select.models';

/** Per-app counter used to generate unique ids and anchor names. */
let _selectInstanceCounter = 0;

/**
 * PerfectUI Select component.
 *
 * Built with Angular's latest signal APIs:
 *   • `input()` / `model()` / `output()` for typed reactive I/O
 *   • `viewChild()` for signal-based template queries
 *   • `computed()` for derived view state
 *   • `effect()` + `afterRenderEffect()` for reactive DOM work
 *   • `DestroyRef` for cleanup (no `OnDestroy` interface needed)
 *   • Signal-driven `host: {}` bindings (no `@HostListener`)
 *
 * Features:
 *   - Single & multi select, optional checkboxes inside options
 *   - Virtual scrolling for thousands of options
 *   - **CSS Anchor Positioning** (`anchor-name`, `position-anchor`,
 *     `anchor()`, `anchor-size()`, `position-try-fallbacks`) when
 *     supported, with a JS `getBoundingClientRect` fallback.
 *   - Panel is portalled to `<body>` so ancestor `transform`,
 *     `overflow`, `filter`, `contain` rules cannot clip it.
 *   - Searchable, grouped options, full keyboard nav, ARIA-compliant
 *   - ControlValueAccessor (works with `ngModel` & ReactiveForms)
 */
@Component({
  selector: 'pui-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PuiSelect),
      multi: true,
    },
  ],
  templateUrl: './select.html',
  styleUrl: './select.css',
  host: {
    '(window:orientationchange)': 'onOrientationChange()',
  },
})
export class PuiSelect<T = unknown> implements ControlValueAccessor {
  // ============== Signal-based view queries ==============
  private readonly triggerRef = viewChild.required<ElementRef<HTMLElement>>('trigger');
  private readonly panelTpl = viewChild.required<TemplateRef<unknown>>('panelTpl');
  private readonly panelRef = viewChild<ElementRef<HTMLElement>>('panel');
  private readonly viewportRef = viewChild<ElementRef<HTMLElement>>('viewport');
  private readonly searchInputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  /** Convenience accessors that unwrap the signal + nativeElement. */
  private trigger() {
    return this.triggerRef().nativeElement;
  }

  private panel(): HTMLElement | undefined {
    return this.panelRef()?.nativeElement;
  }

  private viewport(): HTMLElement | undefined {
    return this.viewportRef()?.nativeElement;
  }

  private searchInput(): HTMLInputElement | undefined {
    return this.searchInputRef()?.nativeElement;
  }

  // ============== Input signals (configuration) ==============
  readonly options = input<SelectOptionLike<T>[]>([]);
  readonly theme = input<SelectTheme>('default');
  readonly size = input<SelectSize>('medium');
  readonly status = input<SelectStatus>('default');
  readonly placeholder = input<string>('Select...');
  readonly searchPlaceholder = input<string>('Search...');
  readonly multiple = input<boolean>(false);
  readonly checkbox = input<boolean>(false);
  readonly searchable = input<boolean>(false);
  readonly clearable = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly visibleRows = input<number>(7);
  readonly rowHeight = input<number>(36);
  readonly groupHeaderHeight = input<number>(28);
  readonly overscan = input<number>(4);
  readonly placement = input<SelectPlacement>('auto');
  readonly closeOnSelect = input<boolean>(true);
  readonly maxSelections = input<number>(0);
  readonly emptyText = input<string>('No options');
  readonly matchTriggerWidth = input<boolean>(true);
  readonly minPanelWidth = input<number>(200);
  readonly ariaLabel = input<string>('Select');

  /**
   * Show a sticky "Select all" row at the top of the panel.
   * Only takes effect when `[multiple]="true"`. The row toggles
   * selection for every non-disabled option that is currently
   * visible (i.e. respects the search filter).
   */
  readonly selectAll = input<boolean>(false);
  /** Label for the select-all row. */
  readonly selectAllLabel = input<string>('Select all');

  /**
   * Maximum number of selected-value tags to render inside the
   * trigger when `[multiple]="true"`. Any remaining selections
   * collapse into a single overflow chip (e.g. "+3 more").
   *
   * `0` (default) renders all tags.
   */
  readonly maxVisibleTags = input<number>(0);
  /**
   * Format for the overflow chip. Receives the count of hidden
   * selections; default returns `"+N more"`.
   */
  readonly moreLabel = input<(hidden: number) => string>((n) => `+${n} more`);

  // Two-way value binding (signal model)
  readonly value = model<T | T[] | null>(null);

  // Outputs (signal-based)
  readonly changed = output<SelectChangeEvent<T>>();
  readonly openChange = output<SelectOpenChangeEvent>();
  readonly searchChange = output<string>();

  // ============== Injected services ==============
  private readonly doc = inject(DOCUMENT);
  private readonly vcr = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  // ============== Identifiers & feature detection ==============
  private readonly _instanceId = `pui-select-${ ++_selectInstanceCounter }`;
  /** Unique CSS anchor name for this instance. */
  readonly anchorName = signal<string>(`--${ this._instanceId }-anchor`);
  /** Stable id for ARIA wiring. */
  readonly panelId = signal<string>(`${ this._instanceId }-listbox`);
  /** Whether the browser supports the CSS Anchor Positioning API. */
  readonly supportsAnchor = signal<boolean>(this.detectAnchorSupport());

  // ============== Reactive UI state ==============
  readonly isOpen = signal(false);
  readonly searchQuery = signal('');
  readonly activeIndex = signal(-1);
  readonly scrollTop = signal(0);

  // JS-fallback positioning state (only consulted when !supportsAnchor)
  readonly panelTop = signal(0);
  readonly panelLeft = signal(0);
  readonly panelWidth = signal(0);
  readonly panelMaxHeight = signal(300);
  readonly panelPlacement = signal<'top' | 'bottom'>('bottom');

  // ============== ControlValueAccessor private state ==============
  private readonly _cvaDisabled = signal<boolean>(false);
  private onChange: (value: T | T[] | null) => void = () => {
  };
  private onTouched: () => void = () => {
  };

  // ============== Portal state ==============
  private panelView: EmbeddedViewRef<unknown> | null = null;
  private panelRoot: HTMLElement | null = null;

  // Stable bound listeners
  private readonly _reposition = () => this.repositionPanelIfNeeded();
  private readonly _docClick = (e: Event) => this.onDocumentClick(e);

  constructor() {
    // -------- Reactive DOM lifecycle: create / destroy panel --------
    //
    // `effect` reactively drives the portal: opening creates the
    // embedded view + appends to <body>; closing tears it down.
    effect((onCleanup) => {
      const open = this.isOpen();
      if (!open) return;
      // Read inputs that should trigger a reposition while open.
      this.viewportHeight();
      this.placement();
      this.matchTriggerWidth();
      this.minPanelWidth();

      // We don't create the portal inside the effect (it has DOM
      // side-effects on first open) — that's done in `open()`. But
      // we do schedule positioning whenever a positioning input
      // changes while open.
      untracked(() => this.repositionPanelIfNeeded());

      onCleanup(() => {
        // No-op: portal is torn down explicitly in close().
      });
    });

    // -------- Reactive DOM listeners (scroll/resize/click) --------
    effect((onCleanup) => {
      if (!this.isOpen()) return;
      const win = this.doc.defaultView;
      if (!win) return;

      win.addEventListener('scroll', this._reposition, true);
      win.addEventListener('resize', this._reposition);
      this.doc.addEventListener('click', this._docClick, true);

      onCleanup(() => {
        win.removeEventListener('scroll', this._reposition, true);
        win.removeEventListener('resize', this._reposition);
        this.doc.removeEventListener('click', this._docClick, true);
      });
    });

    // -------- After-render: focus the right element when open --------
    //
    // `afterRenderEffect` runs after Angular has updated the DOM, so
    // the portalled panel's elements are guaranteed to exist when we
    // try to focus them. This replaces the old `Promise.resolve()` /
    // `requestAnimationFrame` chain.
    afterRenderEffect(() => {
      if (!this.isOpen()) return;
      // Touch the searchable signal so this re-runs if it changes.
      const wantSearch = this.searchable();
      // The panel root only exists after `createPanel()` ran.
      if (!this.panelRoot) return;

      if (wantSearch) {
        const input = this.panelRoot.querySelector(
          '.pui-select-search-input',
        ) as HTMLInputElement | null;
        if (input && this.doc.activeElement !== input) {
          input.focus();
          try {
            input.select();
          } catch { /* noop */
          }
        }
      } else {
        const panel = this.panelRoot.querySelector(
          '.pui-select-panel',
        ) as HTMLElement | null;
        if (panel && this.doc.activeElement !== panel) {
          panel.focus();
        }
      }
    });

    // -------- Cleanup on destroy --------
    this.destroyRef.onDestroy(() => this.destroyPanel());
  }

  // ============== ControlValueAccessor ==============
  writeValue(value: T | T[] | null): void {
    this.value.set(value ?? (this.multiple() ? [] : null));
  }

  registerOnChange(fn: (value: T | T[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._cvaDisabled.set(isDisabled);
  }

  // ============== Computed view-state ==============
  readonly isDisabled = computed(() => this.disabled() || this._cvaDisabled());

  /**
   * Whether to render a checkbox marker inside each option row.
   * Only honours the explicit `[checkbox]` input so multi-select
   * without checkboxes is a valid configuration. Set both
   * `[multiple]="true"` AND `[checkbox]="true"` to get the classic
   * "checklist" UX.
   */
  readonly showCheckbox = computed(() => this.checkbox());

  readonly containerClasses = computed(() => {
    const c = [
      `pui-select-theme-${ this.theme() }`,
      `pui-select-${ this.size() }`,
    ];
    if (this.status() !== 'default') c.push(`pui-select-status-${ this.status() }`);
    if (this.isDisabled()) c.push('pui-select-disabled');
    if (this.isOpen()) c.push('pui-select-open');
    if (this.hasSelection()) c.push('pui-select-has-value');
    return c.join(' ');
  });

  readonly panelClasses = computed(() =>
    [
      `pui-select-panel-${ this.theme() }`,
      `pui-select-panel-${ this.size() }`,
      `pui-select-panel-place-${ this.placement() }`,
      `pui-select-panel-${ this.panelPlacement() }`,
      this.matchTriggerWidth() ? 'pui-select-panel-match-width' : 'pui-select-panel-min-width',
    ].join(' '),
  );

  /** All rows (group + options) flattened for virtual scrolling */
  readonly allRows = computed<SelectFlatRow<T>[]>(() => this.flatten(this.options()));

  /** Filtered rows by current search query */
  readonly filteredRows = computed<SelectFlatRow<T>[]>(() =>
    this.searchable() ? this.filter(this.allRows(), this.searchQuery()) : this.allRows(),
  );

  /** Total scroll height in px */
  readonly totalHeight = computed(() => {
    const rh = this.rowHeight();
    const gh = this.groupHeaderHeight();
    let total = 0;
    for (const r of this.filteredRows()) total += r.type === 'group' ? gh : rh;
    return total;
  });

  readonly viewportHeight = computed(() =>
    Math.min(this.totalHeight(), this.visibleRows() * this.rowHeight()),
  );

  /** Virtualization: which rows to render and what offset to translate them to. */
  private readonly _virt = computed(() => {
    const rows = this.filteredRows();
    const rh = this.rowHeight();
    const gh = this.groupHeaderHeight();
    const overscan = this.overscan();
    const viewport = this.viewportHeight();
    const scroll = this.scrollTop();

    if (rows.length === 0) {
      return { visible: [] as SelectFlatRow<T>[], offsetY: 0 };
    }

    let acc = 0;
    let startIdx = 0;
    let offsetY = 0;
    let endIdx = rows.length - 1;

    for (let i = 0; i < rows.length; i++) {
      const h = rows[i].type === 'group' ? gh : rh;
      if (acc + h > scroll) {
        startIdx = i;
        offsetY = acc;
        break;
      }
      acc += h;
    }

    let acc2 = offsetY;
    for (let i = startIdx; i < rows.length; i++) {
      acc2 += rows[i].type === 'group' ? gh : rh;
      if (acc2 >= scroll + viewport) {
        endIdx = i;
        break;
      }
    }

    const lo = Math.max(0, startIdx - overscan);
    const hi = Math.min(rows.length - 1, endIdx + overscan);

    let off = 0;
    for (let i = 0; i < lo; i++) off += rows[i].type === 'group' ? gh : rh;

    return { visible: rows.slice(lo, hi + 1), offsetY: off };
  });

  readonly renderedRows = computed(() => this._virt().visible);
  readonly offsetY = computed(() => this._virt().offsetY);

  /** Currently selected options resolved from value */
  readonly selectedOptions = computed<SelectOption<T>[]>(() => {
    const val = this.value();
    if (val === null || val === undefined) return [];
    const rows = this.allRows();
    if (this.multiple()) {
      const arr = Array.isArray(val) ? val : [val];
      const out: SelectOption<T>[] = [];
      for (const v of arr) {
        const found = this.findOptionByValue(rows, v);
        if (found) out.push(found);
      }
      return out;
    }
    const found = this.findOptionByValue(rows, val as T);
    return found ? [found] : [];
  });

  readonly hasSelection = computed(() => this.selectedOptions().length > 0);
  readonly singleSelectedLabel = computed(() => this.selectedOptions()[0]?.label ?? '');

  /**
   * Subset of `selectedOptions()` to actually render as tags inside
   * the trigger when `multiple=true`. Honors `maxVisibleTags`:
   * `0` (default) means render them all.
   */
  readonly visibleTags = computed<SelectOption<T>[]>(() => {
    const all = this.selectedOptions();
    const max = this.maxVisibleTags();
    if (max <= 0 || all.length <= max) return all;
    return all.slice(0, max);
  });

  /** Number of selections hidden behind the "+N more" overflow chip. */
  readonly hiddenTagCount = computed<number>(() => {
    const all = this.selectedOptions().length;
    const max = this.maxVisibleTags();
    if (max <= 0 || all <= max) return 0;
    return all - max;
  });

  /** Pre-formatted overflow label text. */
  readonly moreLabelText = computed<string>(() => {
    const hidden = this.hiddenTagCount();
    if (hidden <= 0) return '';
    return this.moreLabel()(hidden);
  });

  /**
   * Whether the "Select all" row should actually be rendered.
   * Requires multi-select to be on; the input is silently ignored
   * for single-select since "select all" makes no sense there.
   */
  readonly showSelectAll = computed(() => this.multiple() && this.selectAll());

  /**
   * Tri-state of the select-all checkbox over the *currently
   * visible* (filtered) selectable options.
   *
   *   'none'         — no visible options selected
   *   'all'          — every visible selectable option is selected
   *   'indeterminate'— some but not all visible options selected
   */
  readonly selectAllState = computed<'none' | 'indeterminate' | 'all'>(() => {
    if (!this.showSelectAll()) return 'none';
    const rows = this.filteredRows();
    const valArr = (this.value() as T[] | null) ?? [];

    let total = 0;
    let selected = 0;
    for (const r of rows) {
      if (r.type !== 'option' || !r.option || r.option.disabled) continue;
      total++;
      if (valArr.indexOf(r.option.value) >= 0) selected++;
    }
    if (total === 0 || selected === 0) return 'none';
    if (selected >= total) return 'all';
    return 'indeterminate';
  });

  /** Stable id for the option at a given flat-row index. */
  optionId(index: number): string {
    return `${ this._instanceId }-opt-${ index }`;
  }

  /**
   * The id of the currently active (highlighted) option, used by
   * the trigger / search input for `aria-activedescendant`.
   */
  readonly activeOptionId = computed<string | null>(() => {
    const idx = this.activeIndex();
    if (idx < 0) return null;
    const row = this.filteredRows()[idx];
    if (!row || row.type !== 'option') return null;
    return this.optionId(idx);
  });

  // ============== Public API ==============
  /** Open the dropdown panel (portalled to body) */
  open(): void {
    if (this.isDisabled() || this.isOpen()) return;
    this.activeIndex.set(this.findActiveStartIndex());
    this.createPanel();
    this.isOpen.set(true);
    this.openChange.emit({ open: true });
    this.scrollActiveIntoView();
  }

  /** Close the dropdown panel */
  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.searchQuery.set('');
    this.scrollTop.set(0);
    this.activeIndex.set(-1);
    this.destroyPanel();
    this.openChange.emit({ open: false });
    this.onTouched();
    queueMicrotask(() => this.trigger()?.focus());
  }

  /** Toggle the dropdown panel open/closed */
  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  /** Whether a particular value is currently selected */
  isSelected(value: T): boolean {
    const v = this.value();
    if (v === null || v === undefined) return false;
    if (Array.isArray(v)) return v.indexOf(value) >= 0;
    return v === value;
  }

  // ============== Event handlers (used by template) ==============
  onTriggerKeyDown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;
    const k = event.key;

    if (!this.isOpen()) {
      if (k === 'Enter' || k === ' ' || k === 'ArrowDown' || k === 'ArrowUp') {
        event.preventDefault();
        this.open();
      } else if (k === 'Backspace' && this.clearable() && this.hasSelection()) {
        event.preventDefault();
        this.onClear();
      }
      return;
    }
    this.handlePanelKey(event);
  }

  onSearchKeyDown(event: KeyboardEvent): void {
    this.handlePanelKey(event);
  }

  /** Keydown forwarded from the panel/listbox itself (when searchable=false). */
  onPanelKeyDown(event: KeyboardEvent): void {
    this.handlePanelKey(event);
  }

  onSearchInput(event: Event): void {
    const q = (event.target as HTMLInputElement).value;
    this.searchQuery.set(q);
    this.scrollTop.set(0);
    const vp = this.viewport();
    if (vp) vp.scrollTop = 0;
    this.activeIndex.set(this.findFirstSelectableIndex());
    this.searchChange.emit(q);
  }

  onViewportScroll(event: Event): void {
    this.scrollTop.set((event.target as HTMLElement).scrollTop);
  }

  onOptionHover(index: number): void {
    this.activeIndex.set(index);
  }

  onOptionClick(event: MouseEvent, option: SelectOption<T>): void {
    event.stopPropagation();
    if (option.disabled) return;
    this.toggleOption(option);
  }

  onPanelMouseDown(event: MouseEvent): void {
    // Prevent the trigger from losing focus (and the panel from
    // closing) when clicking in the panel — except on form fields,
    // which need their default mousedown behavior to focus.
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const tag = target.tagName;
    if (
      tag === 'INPUT' ||
      tag === 'TEXTAREA' ||
      tag === 'SELECT' ||
      target.isContentEditable
    ) {
      return;
    }
    event.preventDefault();
  }

  onClear(event?: Event): void {
    if (event) event.stopPropagation();
    this.commitValue(this.multiple() ? [] : null, null);
  }

  removeTag(event: MouseEvent, opt: SelectOption<T>): void {
    event.stopPropagation();
    if (this.isDisabled() || !this.multiple()) return;
    const current = (this.value() as T[]) || [];
    const next = current.filter((v) => v !== opt.value);
    this.commitValue(next, this.selectedOptions().filter((o) => o.value !== opt.value));
  }

  /**
   * Toggle the "Select all" row. If the current state is 'all',
   * deselects all visible options; otherwise selects every
   * non-disabled visible option (clamped to `maxSelections`).
   *
   * "Visible" means the rows that survive the current search
   * filter — this matches user expectation for filtered lists.
   */
  onSelectAllClick(event: Event): void {
    event.stopPropagation();
    if (this.isDisabled() || !this.showSelectAll()) return;

    const rows = this.filteredRows();
    const state = this.selectAllState();
    const current = ((this.value() as T[]) || []).slice();

    if (state === 'all') {
      // Deselect every visible (filtered) option, leaving any
      // selections from outside the current filter intact.
      const visible = new Set<T>();
      for (const r of rows) {
        if (r.type === 'option' && r.option && !r.option.disabled) {
          visible.add(r.option.value);
        }
      }
      const next = current.filter((v) => !visible.has(v));
      const opts = this.allRows()
        .filter((r) => r.type === 'option' && r.option && next.indexOf(r.option.value) >= 0)
        .map((r) => r.option!) as SelectOption<T>[];
      this.commitValue(next, opts);
      return;
    }

    // 'none' or 'indeterminate' — add every visible non-disabled,
    // not-already-selected option, respecting maxSelections.
    const max = this.maxSelections();
    const next = current.slice();
    for (const r of rows) {
      if (max > 0 && next.length >= max) break;
      if (r.type !== 'option' || !r.option || r.option.disabled) continue;
      if (next.indexOf(r.option.value) < 0) next.push(r.option.value);
    }
    const opts = this.allRows()
      .filter((r) => r.type === 'option' && r.option && next.indexOf(r.option.value) >= 0)
      .map((r) => r.option!) as SelectOption<T>[];
    this.commitValue(next, opts);
  }

  onOrientationChange(): void {
    if (this.isOpen()) this.repositionPanelIfNeeded();
  }

  // ============== Selection logic ==============
  private toggleOption(option: SelectOption<T>): void {
    if (this.multiple()) {
      const current = ((this.value() as T[]) || []).slice();
      const idx = current.indexOf(option.value);
      if (idx >= 0) {
        current.splice(idx, 1);
      } else {
        const max = this.maxSelections();
        if (max > 0 && current.length >= max) return;
        current.push(option.value);
      }
      const opts = this.allRows()
        .filter((r) => r.type === 'option' && r.option && current.indexOf(r.option.value) >= 0)
        .map((r) => r.option!) as SelectOption<T>[];
      this.commitValue(current, opts);
      // multi: keep panel open by default
    } else {
      this.commitValue(option.value, option);
      if (this.closeOnSelect()) this.close();
    }
  }

  private commitValue(
    value: T | T[] | null,
    selected: SelectOption<T> | SelectOption<T>[] | null,
  ): void {
    this.value.set(value);
    this.onChange(value);
    this.changed.emit({ value, selected });
  }

  // ============== Keyboard nav ==============
  private handlePanelKey(event: KeyboardEvent): void {
    const k = event.key;
    switch (k) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActive(-1);
        break;
      case 'PageDown':
        event.preventDefault();
        this.moveActiveBy(this.visibleRows());
        break;
      case 'PageUp':
        event.preventDefault();
        this.moveActiveBy(-this.visibleRows());
        break;
      case 'Home':
        event.preventDefault();
        this.activeIndex.set(this.findFirstSelectableIndex());
        this.scrollActiveIntoView();
        break;
      case 'End':
        event.preventDefault();
        this.activeIndex.set(this.findLastSelectableIndex());
        this.scrollActiveIntoView();
        break;
      case 'Enter':
      case ' ':
        if (k === ' ' && this.searchable() && this.isSearchInputFocused()) {
          // Let the space character be typed into the search box.
          return;
        }
        event.preventDefault();
        this.selectActive();
        break;
      case 'Escape':
        event.preventDefault();
        event.stopPropagation();
        this.close();
        break;
      case 'Tab':
        // Allow native tab to move focus, but close the panel.
        this.close();
        break;
    }
  }

  private moveActive(direction: 1 | -1): void {
    const rows = this.filteredRows();
    if (rows.length === 0) return;
    let idx = this.activeIndex();
    for (let step = 0; step < rows.length; step++) {
      idx += direction;
      if (idx < 0) idx = rows.length - 1;
      if (idx >= rows.length) idx = 0;
      const r = rows[idx];
      if (r.type === 'option' && !r.option?.disabled) {
        this.activeIndex.set(idx);
        this.scrollActiveIntoView();
        return;
      }
    }
  }

  private moveActiveBy(delta: number): void {
    if (delta === 0) return;
    const direction: 1 | -1 = delta > 0 ? 1 : -1;
    const steps = Math.abs(delta);
    for (let i = 0; i < steps; i++) this.moveActive(direction);
  }

  private findFirstSelectableIndex(): number {
    const rows = this.filteredRows();
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].type === 'option' && !rows[i].option?.disabled) return i;
    }
    return -1;
  }

  private findActiveStartIndex(): number {
    const rows = this.filteredRows();
    const val = this.value();
    if (val !== null && val !== undefined && !this.multiple()) {
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        if (r.type === 'option' && r.option && !r.option.disabled && r.option.value === val) {
          return i;
        }
      }
    }
    return this.findFirstSelectableIndex();
  }

  private findLastSelectableIndex(): number {
    const rows = this.filteredRows();
    for (let i = rows.length - 1; i >= 0; i--) {
      if (rows[i].type === 'option' && !rows[i].option?.disabled) return i;
    }
    return -1;
  }

  private isSearchInputFocused(): boolean {
    const active = this.doc.activeElement as HTMLElement | null;
    if (!active) return false;
    if (active === this.searchInput()) return true;
    return active.classList?.contains('pui-select-search-input') === true;
  }

  private selectActive(): void {
    const idx = this.activeIndex();
    if (idx < 0) return;
    const row = this.filteredRows()[idx];
    if (row?.type === 'option' && row.option && !row.option.disabled) {
      this.toggleOption(row.option);
    }
  }

  private scrollActiveIntoView(): void {
    const idx = this.activeIndex();
    if (idx < 0) return;
    const rows = this.filteredRows();
    const rh = this.rowHeight();
    const gh = this.groupHeaderHeight();
    let off = 0;
    for (let i = 0; i < idx; i++) off += rows[i].type === 'group' ? gh : rh;
    const rowH = rows[idx].type === 'group' ? gh : rh;

    queueMicrotask(() => {
      const vp = this.viewport();
      if (!vp) return;
      const top = off;
      const bottom = off + rowH;
      if (top < vp.scrollTop) vp.scrollTop = top;
      else if (bottom > vp.scrollTop + vp.clientHeight) vp.scrollTop = bottom - vp.clientHeight;
    });
  }

  // ============== Option-list helpers ==============
  private isGroup(entry: SelectOptionLike<T>): entry is SelectOptionGroup<T> {
    return Array.isArray((entry as SelectOptionGroup<T>).options);
  }

  private flatten(items: SelectOptionLike<T>[]): SelectFlatRow<T>[] {
    const rows: SelectFlatRow<T>[] = [];
    let i = 0;
    for (const entry of items) {
      if (this.isGroup(entry)) {
        rows.push({ type: 'group', index: i++, group: entry });
        for (const opt of entry.options) {
          rows.push({
            type: 'option',
            index: i++,
            option: entry.disabled ? { ...opt, disabled: true } : opt,
          });
        }
      } else {
        rows.push({ type: 'option', index: i++, option: entry });
      }
    }
    return rows;
  }

  private filter(rows: SelectFlatRow<T>[], query: string): SelectFlatRow<T>[] {
    const q = query.trim().toLowerCase();
    if (!q) return rows;

    const result: SelectFlatRow<T>[] = [];
    let pendingGroup: SelectFlatRow<T> | null = null;
    let groupHasMatch = false;

    for (const row of rows) {
      if (row.type === 'group') {
        pendingGroup = row;
        groupHasMatch = false;
        continue;
      }
      const opt = row.option!;
      if (opt.label.toLowerCase().includes(q)) {
        if (pendingGroup && !groupHasMatch) {
          result.push(pendingGroup);
          groupHasMatch = true;
        }
        result.push(row);
      }
    }
    return result;
  }

  private findOptionByValue(rows: SelectFlatRow<T>[], value: T): SelectOption<T> | null {
    for (const row of rows) {
      if (row.type === 'option' && row.option && row.option.value === value) {
        return row.option;
      }
    }
    return null;
  }

  // ============== Panel portal (render to document.body) ==============
  private createPanel(): void {
    if (this.panelView) return;

    // Compute an initial max-height for both anchored & fallback modes.
    this.panelMaxHeight.set(this.computeDesiredMaxHeight());

    // Create the embedded view from the <ng-template #panelTpl>.
    this.panelView = this.vcr.createEmbeddedView(this.panelTpl());
    this.panelView.detectChanges();

    // Move root nodes to <body>, wrapped in a single host element.
    const host = this.doc.createElement('div');
    host.className = 'pui-select-portal';
    for (const node of this.panelView.rootNodes as Node[]) {
      host.appendChild(node);
    }
    this.doc.body.appendChild(host);
    this.panelRoot = host;

    // Position once the panel is in the DOM.
    queueMicrotask(() => this.repositionPanelIfNeeded());
  }

  private destroyPanel(): void {
    if (this.panelRoot && this.panelRoot.parentNode) {
      this.panelRoot.parentNode.removeChild(this.panelRoot);
    }
    this.panelRoot = null;
    if (this.panelView) {
      this.panelView.destroy();
      this.panelView = null;
    }
  }

  // ============== Outside-click ==============
  private onDocumentClick(event: Event): void {
    const target = event.target as Node;
    const trigger = this.trigger();
    const panel = this.panel();
    if (trigger?.contains(target)) return;
    if (panel?.contains(target)) return;
    this.close();
  }

  // ============== Positioning ==============
  private detectAnchorSupport(): boolean {
    if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') return false;
    return (
      CSS.supports('anchor-name: --x') &&
      CSS.supports('position-anchor: --x') &&
      CSS.supports('top', 'anchor(bottom)')
    );
  }

  /**
   * If the browser supports CSS Anchor Positioning we let the
   * stylesheet do all the work. Otherwise we run a manual
   * `getBoundingClientRect()` based fallback.
   */
  private repositionPanelIfNeeded(): void {
    if (!this.isOpen()) return;
    if (this.supportsAnchor()) {
      // Even with anchor positioning we still want to recompute
      // max-height when the available space changes.
      this.panelMaxHeight.set(this.computeDesiredMaxHeight());
      return;
    }
    this.repositionPanelFallback();
  }

  private computeDesiredMaxHeight(): number {
    const win = this.doc.defaultView;
    if (!win) return 300;
    const trigger = this.trigger();
    if (!trigger) return 300;
    const rect = trigger.getBoundingClientRect();
    const viewportH = win.innerHeight || this.doc.documentElement.clientHeight;
    const margin = 8;
    const desired = this.visibleRows() * this.rowHeight()
      + (this.searchable() ? 44 : 0)
      + 8;
    const spaceBelow = viewportH - rect.bottom - margin;
    const spaceAbove = rect.top - margin;
    const wanted = this.placement();
    const place = wanted === 'top' ? 'top'
      : wanted === 'bottom' ? 'bottom'
        : (spaceBelow >= desired || spaceBelow >= spaceAbove ? 'bottom' : 'top');
    return Math.max(120, Math.min(desired, place === 'bottom' ? spaceBelow : spaceAbove));
  }

  private repositionPanelFallback(): void {
    const trigger = this.trigger();
    if (!trigger) return;
    const win = this.doc.defaultView;
    if (!win) return;

    const rect = trigger.getBoundingClientRect();
    const viewportH = win.innerHeight || this.doc.documentElement.clientHeight;
    const margin = 8;

    const desired = this.visibleRows() * this.rowHeight()
      + (this.searchable() ? 44 : 0)
      + 8;
    const spaceBelow = viewportH - rect.bottom - margin;
    const spaceAbove = rect.top - margin;

    const wanted = this.placement();
    const place: 'top' | 'bottom' = wanted === 'top' ? 'top'
      : wanted === 'bottom' ? 'bottom'
        : (spaceBelow >= desired || spaceBelow >= spaceAbove ? 'bottom' : 'top');

    const maxH = Math.max(120, Math.min(desired, place === 'bottom' ? spaceBelow : spaceAbove));
    const top = place === 'bottom' ? rect.bottom + 4 : rect.top - 4 - maxH;
    const left = rect.left;
    const width = this.matchTriggerWidth() ? rect.width : Math.max(this.minPanelWidth(), rect.width);

    this.panelTop.set(top);
    this.panelLeft.set(left);
    this.panelWidth.set(width);
    this.panelMaxHeight.set(maxH);
    this.panelPlacement.set(place);
  }
}
