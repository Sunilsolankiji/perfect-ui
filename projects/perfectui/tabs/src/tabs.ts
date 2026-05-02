import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  contentChildren,
  input,
  model,
  output,
  signal,
  untracked,
  viewChild,
  viewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuiTab } from './tab';
import {
  TabChangeEvent,
  TabsAlign,
  TabsOrientation,
  TabsSize,
  TabsVariant,
} from './tabs.models';

/** Per-app counter used to generate unique ids for ARIA wiring. */
let _tabsInstanceCounter = 0;

/**
 * PerfectUI Tabs component.
 *
 * Built with Angular's latest signal APIs:
 *   • `input()` / `model()` / `output()` for typed reactive I/O
 *   • `contentChildren()` / `viewChildren()` for signal-based queries
 *   • `computed()` for derived view state
 *   • `afterRenderEffect()` for indicator measurement after layout
 *
 * Design notes:
 *   - Side effects that *react to user intent* (emitting `tabChange`,
 *     auto-scroll) are fired imperatively from `selectTab()` instead
 *     of from an `effect`. This avoids stale-closure pitfalls and the
 *     anti-pattern of mutating non-signal state from reactive
 *     effects, and gives consumers a clean "no event on first render"
 *     guarantee that doesn't depend on heuristics.
 *   - Disabled tabs use `aria-disabled` + runtime guards rather than
 *     the native `disabled` attribute. The native attribute would
 *     suppress focus / keydown, breaking the WAI-ARIA APG "tabs with
 *     automatic activation" pattern.
 *
 * Features:
 *   - Horizontal & vertical orientations
 *   - Visual variants: `line` (animated indicator), `filled`, `pills`,
 *     `bordered`
 *   - Plain-text labels OR rich `<ng-template puiTabLabel>` labels
 *   - Optional icons + badges per tab
 *   - Lazy panel rendering (`[lazy]="true"`) — only the active tab's
 *     body is rendered. Default eagerly renders all but hides the
 *     inactive ones (preserves form state, scroll, etc.).
 *   - Two-way `[(selectedIndex)]` model binding
 *   - Full keyboard navigation (Arrow / Home / End / Enter / Space)
 *   - WAI-ARIA `tablist` / `tab` / `tabpanel` with proper id wiring
 *   - Honours `prefers-reduced-motion`
 *
 * @example
 * ```html
 * <pui-tabs [(selectedIndex)]="active" variant="line" align="start">
 *   <pui-tab label="Overview" icon="📊">…</pui-tab>
 *   <pui-tab label="Settings" icon="⚙️" [badge]="3">…</pui-tab>
 *   <pui-tab label="Disabled" [disabled]="true">…</pui-tab>
 * </pui-tabs>
 * ```
 */
@Component({
  selector: 'pui-tabs',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
  host: {
    'class': 'pui-tabs-host',
    '[class]': 'hostClasses()',
    '(window:resize)': 'measureIndicator()',
    '(window:orientationchange)': 'measureIndicator()',
  },
})
export class PuiTabs {
  // ============== Inputs ==============
  readonly variant = input<TabsVariant>('line');
  readonly orientation = input<TabsOrientation>('horizontal');
  readonly size = input<TabsSize>('medium');
  readonly align = input<TabsAlign>('start');

  /** Whether to scroll the active tab into view as it changes. */
  readonly autoScroll = input<boolean>(true);

  /**
   * Lazy panels — when `true`, only the active tab's content is
   * rendered. Default `false` keeps inactive tabs in the DOM (hidden)
   * so things like form state and scroll positions are preserved
   * across switches.
   */
  readonly lazy = input<boolean>(false);

  /** Animate the active indicator. Set to `false` to disable. */
  readonly animated = input<boolean>(true);

  /** Disable the entire tab group. */
  readonly disabled = input<boolean>(false);

  /** ARIA label applied to the tablist. */
  readonly ariaLabel = input<string>('Tabs');

  // ============== Two-way model ==============
  /**
   * Index of the active tab. Two-way bindable via
   * `[(selectedIndex)]`. Out-of-range / disabled values are gracefully
   * handled by `activeIndex()` for rendering, but the underlying
   * model is left untouched so consumers can detect & correct the
   * situation.
   */
  readonly selectedIndex = model<number>(0);

  // ============== Outputs ==============
  /**
   * Fires whenever the active tab actually changes — via click,
   * keyboard or `selectTab()`. Does NOT fire on first render.
   */
  readonly tabChange = output<TabChangeEvent>();

  // ============== Content / view queries ==============
  readonly tabs = contentChildren(PuiTab);
  private readonly tabHeaderRefs = viewChildren<ElementRef<HTMLButtonElement>>('tabHeader');
  private readonly listRef = viewChild<ElementRef<HTMLElement>>('list');

  // ============== Identifiers ==============
  private readonly _instanceId = `pui-tabs-${ ++_tabsInstanceCounter }`;

  /** Stable id for the tab header at `index` (used by `aria-labelledby`). */
  tabId(index: number): string {
    return `${ this._instanceId }-tab-${ index }`;
  }

  /** Stable id for the panel at `index` (used by `aria-controls`). */
  panelId(index: number): string {
    return `${ this._instanceId }-panel-${ index }`;
  }

  // ============== Internal state ==============
  /** Indicator geometry (px) — animated by CSS transitions. */
  readonly indicatorOffset = signal(0);
  readonly indicatorSize = signal(0);
  readonly indicatorReady = signal(false);

  // ============== Computed view-state ==============
  readonly hostClasses = computed(() =>
    [
      'pui-tabs',
      `pui-tabs-${ this.variant() }`,
      `pui-tabs-${ this.orientation() }`,
      `pui-tabs-${ this.size() }`,
      `pui-tabs-align-${ this.align() }`,
      this.disabled() ? 'pui-tabs-disabled' : '',
      this.animated() ? 'pui-tabs-animated' : '',
    ].filter(Boolean).join(' '),
  );

  readonly isHorizontal = computed(() => this.orientation() === 'horizontal');

  /**
   * Resolved & clamped active index. Out-of-range or disabled values
   * fall back to the first selectable tab. The underlying
   * `selectedIndex` model is intentionally left untouched.
   */
  readonly activeIndex = computed(() => {
    const list = this.tabs();
    if (list.length === 0) return -1;
    const wanted = this.selectedIndex();
    if (wanted >= 0 && wanted < list.length && !list[wanted].disabled()) {
      return wanted;
    }
    for (let i = 0; i < list.length; i++) {
      if (!list[i].disabled()) return i;
    }
    return -1;
  });

  /** Whether the animated active indicator should be rendered. */
  readonly showIndicator = computed(
    () => this.variant() === 'line' && this.activeIndex() >= 0,
  );

  constructor() {
    // After every render that could change tab geometry, re-measure
    // the indicator. `afterRenderEffect` runs after Angular has
    // updated the DOM, so `offsetLeft` / `offsetWidth` are stable.
    //
    // Forced layout reads (offsetLeft/Width) are negligible here
    // because tab counts are typically small (<20).
    afterRenderEffect(() => {
      // Touch reactive deps so this re-runs when they change.
      this.activeIndex();
      this.tabs();
      this.variant();
      this.orientation();
      this.size();
      this.align();

      untracked(() => this.measureIndicator());
    });
  }

  // ============== Public API ==============
  /**
   * Programmatically select a tab by index. No-op when the group is
   * disabled, the index is out-of-range, the target tab is disabled,
   * or it is already active. Fires `tabChange` and (if enabled)
   * auto-scrolls the active header into view.
   */
  selectTab(index: number): void {
    if (this.disabled()) return;
    const tabs = this.tabs();
    if (index < 0 || index >= tabs.length) return;
    if (tabs[index].disabled()) return;

    const previousResolved = this.activeIndex();
    if (previousResolved === index) return;

    this.selectedIndex.set(index);

    this.tabChange.emit({
      index,
      previousIndex: previousResolved,
      label: tabs[index].label(),
    });

    if (this.autoScroll()) {
      this.scrollActiveIntoView(index);
    }
  }

  // ============== Event handlers ==============
  onTabClick(index: number): void {
    this.selectTab(index);
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (this.disabled()) return;
    const horizontal = this.isHorizontal();
    const next = horizontal ? 'ArrowRight' : 'ArrowDown';
    const prev = horizontal ? 'ArrowLeft' : 'ArrowUp';

    switch (event.key) {
      case next:
        event.preventDefault();
        this.focusSibling(index, 1);
        break;
      case prev:
        event.preventDefault();
        this.focusSibling(index, -1);
        break;
      case 'Home':
        event.preventDefault();
        this.focusEdge('first');
        break;
      case 'End':
        event.preventDefault();
        this.focusEdge('last');
        break;
      case 'Enter':
      case ' ':
        // Activation key — already activated by Arrow keys when using
        // the automatic-activation pattern, but kept for parity with
        // assistive tech that sends Enter/Space without arrows.
        event.preventDefault();
        this.selectTab(index);
        break;
    }
  }

  // ============== Indicator measurement ==============
  /**
   * Re-measures the active tab and writes the result to the
   * indicator signals. Bound to `window:resize` /
   * `window:orientationchange` host listeners and called
   * automatically from `afterRenderEffect`.
   *
   * Public so the host listener can invoke it directly. Cheap when
   * the active variant doesn't render an indicator.
   */
  measureIndicator(): void {
    if (this.variant() !== 'line') {
      this.indicatorReady.set(false);
      return;
    }
    const idx = this.activeIndex();
    if (idx < 0) {
      this.indicatorReady.set(false);
      return;
    }
    const headers = this.tabHeaderRefs();
    const list = this.listRef()?.nativeElement;
    const header = headers[idx]?.nativeElement;
    if (!header || !list) return;

    if (this.isHorizontal()) {
      this.indicatorOffset.set(header.offsetLeft);
      this.indicatorSize.set(header.offsetWidth);
    } else {
      this.indicatorOffset.set(header.offsetTop);
      this.indicatorSize.set(header.offsetHeight);
    }
    this.indicatorReady.set(true);
  }

  // ============== Keyboard helpers ==============
  private focusSibling(from: number, direction: 1 | -1): void {
    const tabs = this.tabs();
    const n = tabs.length;
    if (n === 0) return;
    let i = from;
    for (let step = 0; step < n; step++) {
      i = (i + direction + n) % n;
      if (!tabs[i].disabled()) {
        this.selectTab(i);
        this.focusHeader(i);
        return;
      }
    }
  }

  private focusEdge(edge: 'first' | 'last'): void {
    const tabs = this.tabs();
    const n = tabs.length;
    if (n === 0) return;
    const range = edge === 'first'
      ? { start: 0, end: n, step: 1 as const }
      : { start: n - 1, end: -1, step: -1 as const };
    for (let i = range.start; i !== range.end; i += range.step) {
      if (!tabs[i].disabled()) {
        this.selectTab(i);
        this.focusHeader(i);
        return;
      }
    }
  }

  private focusHeader(index: number): void {
    const ref = this.tabHeaderRefs()[index];
    if (ref) ref.nativeElement.focus();
  }

  // ============== Scroll helper ==============
  private scrollActiveIntoView(index: number): void {
    const header = this.tabHeaderRefs()[index]?.nativeElement;
    if (!header) return;
    // Defer one task so layout is settled (especially on first open
    // when the tablist may be inside a hidden container).
    queueMicrotask(() => {
      header.scrollIntoView({
        behavior: this.animated() ? 'smooth' : 'auto',
        block: 'nearest',
        inline: 'nearest',
      });
    });
  }
}

