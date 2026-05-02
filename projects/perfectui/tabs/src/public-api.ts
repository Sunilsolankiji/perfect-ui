/**
 * @sunilsolankiji/perfectui/tabs
 *
 * Tabs component for Angular 21+ — signal-based, accessible,
 * and themeable via PerfectUI CSS variables.
 *
 * There is no global config / provider / service for tabs —
 * configuration is done entirely through input signals on the
 * component. Visual styling consumes the global theme set up
 * via `providePerfectUI()` from `@sunilsolankiji/perfectui/core`.
 *
 * @example
 * ```ts
 * import { Component, signal } from '@angular/core';
 * import { PuiTabs, PuiTab } from '@sunilsolankiji/perfectui/tabs';
 *
 * @Component({
 *   imports: [PuiTabs, PuiTab],
 *   template: `
 *     <pui-tabs [(selectedIndex)]="active" variant="line">
 *       <pui-tab label="Overview" icon="📊">
 *         <p>Overview content…</p>
 *       </pui-tab>
 *       <pui-tab label="Inbox" icon="📥" [badge]="12">
 *         <p>You have new messages.</p>
 *       </pui-tab>
 *       <pui-tab label="Disabled" [disabled]="true">
 *         <p>Won't show up.</p>
 *       </pui-tab>
 *     </pui-tabs>
 *   `,
 * })
 * export class MyPage {
 *   readonly active = signal(0);
 * }
 * ```
 */

// Models / types
export type {
  TabsVariant,
  TabsOrientation,
  TabsSize,
  TabsAlign,
  TabChangeEvent,
} from './tabs.models';

// Components
export { PuiTabs } from './tabs';
export { PuiTab, PuiTabLabel } from './tab';

