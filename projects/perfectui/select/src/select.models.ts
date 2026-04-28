/**
 * Select component visual themes
 */
export type SelectTheme = 'default' | 'outline' | 'underline' | 'filled';

/**
 * Select component sizes
 */
export type SelectSize = 'small' | 'medium' | 'large';

/**
 * Select status (for validation styling)
 */
export type SelectStatus = 'default' | 'success' | 'error';

/**
 * Anchor positioning preference (where the dropdown panel
 * appears relative to the trigger). 'auto' will flip based on
 * available viewport space.
 */
export type SelectPlacement = 'auto' | 'bottom' | 'top';

/**
 * A single option entry. Either a flat option or a group
 * containing children.
 */
export interface SelectOption<T = unknown> {
  /** Display label */
  label: string;
  /** Underlying value */
  value: T;
  /** Whether this entry is disabled */
  disabled?: boolean;
  /** Optional icon (text/emoji or arbitrary marker rendered before label) */
  icon?: string;
  /** Optional secondary description shown beneath the label */
  description?: string;
  /** Custom data passthrough */
  data?: unknown;
}

/**
 * A group of options (rendered with a sticky header)
 */
export interface SelectOptionGroup<T = unknown> {
  /** Group label */
  label: string;
  /** Whether the entire group is disabled */
  disabled?: boolean;
  /** Child options */
  options: SelectOption<T>[];
}

/**
 * Union type accepted by the [options] input.
 */
export type SelectOptionLike<T = unknown> = SelectOption<T> | SelectOptionGroup<T>;

/**
 * Internal flat row used by virtual scrolling
 * @internal
 */
export interface SelectFlatRow<T = unknown> {
  type: 'option' | 'group';
  index: number;
  option?: SelectOption<T>;
  group?: SelectOptionGroup<T>;
}

/**
 * Event emitted when the selection changes
 */
export interface SelectChangeEvent<T = unknown> {
  /** The new value (single value or array if multiple) */
  value: T | T[] | null;
  /** The selected option(s) */
  selected: SelectOption<T> | SelectOption<T>[] | null;
}

/**
 * Event emitted when the dropdown panel opens or closes
 */
export interface SelectOpenChangeEvent {
  open: boolean;
}

