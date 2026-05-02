import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  TemplateRef,
  ViewEncapsulation,
  contentChild,
  input,
  viewChild,
} from '@angular/core';

/**
 * Structural directive used to mark a custom label template inside
 * a `<pui-tab>`. Wraps an `<ng-template>` so the parent tab list can
 * render rich label content.
 *
 * @example
 * ```html
 * <pui-tab>
 *   <ng-template puiTabLabel>
 *     <span>🔔 Notifications</span>
 *     <span class="badge">3</span>
 *   </ng-template>
 *   ...
 * </pui-tab>
 * ```
 */
@Directive({
  selector: '[puiTabLabel]',
  standalone: true,
})
export class PuiTabLabel {
}

/**
 * A single tab inside a `<pui-tabs>` group.
 *
 * The component itself renders nothing visible — it just declares
 * metadata + a body template that the parent `<pui-tabs>` projects
 * into the active panel.
 */
@Component({
  selector: 'pui-tab',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #bodyTpl>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class PuiTab {
  /** Plain-text tab label (used when no `puiTabLabel` template is supplied). */
  readonly label = input<string>('');

  /** Whether this tab is disabled and cannot be selected. */
  readonly disabled = input<boolean>(false);

  /** Optional icon (text/emoji) shown before the label. */
  readonly icon = input<string | null>(null);

  /**
   * Optional badge value (string or number) shown after the label —
   * great for unread counts, statuses, etc.
   */
  readonly badge = input<string | number | null>(null);

  /** Body template, projected by the parent into the active panel. */
  readonly bodyTpl = viewChild.required<TemplateRef<unknown>>('bodyTpl');

  /** Optional rich label template (`<ng-template puiTabLabel>...`). */
  readonly labelTpl = contentChild(PuiTabLabel, { read: TemplateRef });
}
