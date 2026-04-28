/**
 * @sunilsolankiji/perfectui/select
 *
 * Select / Multi-select component for Angular 19+ with virtual
 * scrolling, optional checkboxes, search, grouping and
 * cross-browser anchor-style positioning.
 *
 * Configuration is done entirely through input signals on the
 * component — there is no global config / provider for the
 * select. Visual styling consumes the global theme set up via
 * `providePerfectUI()` from `@sunilsolankiji/perfectui/core`.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 * import { FormsModule } from '@angular/forms';
 * import { PuiSelect, SelectOption } from '@sunilsolankiji/perfectui/select';
 *
 * @Component({
 *   imports: [FormsModule, PuiSelect],
 *   template: `
 *     <pui-select
 *       [options]="countries"
 *       [(ngModel)]="selected"
 *       [multiple]="true"
 *       [searchable]="true"
 *       [clearable]="true"
 *       placeholder="Pick one or more..."
 *     />
 *   `,
 * })
 * export class MyForm {
 *   selected: string[] = [];
 *   countries: SelectOption<string>[] = [
 *     { label: 'India', value: 'IN' },
 *     { label: 'United States', value: 'US' },
 *   ];
 * }
 * ```
 */

// Models / types
export type {
  SelectTheme,
  SelectSize,
  SelectStatus,
  SelectPlacement,
  SelectOption,
  SelectOptionGroup,
  SelectOptionLike,
  SelectFlatRow,
  SelectChangeEvent,
  SelectOpenChangeEvent,
} from './select.models';

// Component
export { PuiSelect } from './select';


