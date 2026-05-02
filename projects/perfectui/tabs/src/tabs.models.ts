/**
 * Public types for `@sunilsolankiji/perfectui/tabs`.
 *
 * Use `export type` so consumers tree-shake correctly.
 */

/**
 * Visual style of the tab list.
 *
 *   - `line`   — Material-style underline indicator (default)
 *   - `filled` — solid background pill on the active tab
 *   - `pills`  — rounded pill buttons (segmented control look)
 *   - `bordered` — boxed tabs with a connected bottom border
 */
export type TabsVariant = 'line' | 'filled' | 'pills' | 'bordered';

/**
 * Tab list orientation.
 */
export type TabsOrientation = 'horizontal' | 'vertical';

/**
 * Tab list sizes.
 */
export type TabsSize = 'small' | 'medium' | 'large';

/**
 * Alignment of the tab list along the inline axis.
 */
export type TabsAlign = 'start' | 'center' | 'end' | 'stretch';

/**
 * Event emitted when the active tab changes.
 */
export interface TabChangeEvent {
  /** Index of the newly-selected tab. */
  index: number;
  /** The previously-selected tab index, or -1 on first activation. */
  previousIndex: number;
  /** The label of the newly-selected tab (string label only). */
  label: string;
}

