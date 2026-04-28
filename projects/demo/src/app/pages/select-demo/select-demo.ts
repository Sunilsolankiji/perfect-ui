import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  PuiSelect,
  SelectOption,
  SelectOptionLike,
  SelectChangeEvent,
  SelectTheme,
  SelectSize,
  SelectStatus,
  SelectPlacement,
} from '@sunilsolankiji/perfectui/select';

@Component({
  selector: 'app-select-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PuiSelect],
  templateUrl: './select-demo.html',
  styleUrl: './select-demo.css',
})
export class SelectDemoComponent {
  readonly packageName = '@sunilsolankiji/perfectui/select';

  // Variant pickers
  selectedTheme: SelectTheme = 'default';
  selectedSize: SelectSize = 'medium';
  selectedStatus: SelectStatus = 'default';
  selectedPlacement: SelectPlacement = 'auto';

  // ---- Sample data ----
  countries: SelectOption<string>[] = [
    { label: 'India', value: 'IN', icon: '🇮🇳' },
    { label: 'United States', value: 'US', icon: '🇺🇸' },
    { label: 'United Kingdom', value: 'GB', icon: '🇬🇧' },
    { label: 'Germany', value: 'DE', icon: '🇩🇪' },
    { label: 'France', value: 'FR', icon: '🇫🇷' },
    { label: 'Japan', value: 'JP', icon: '🇯🇵' },
    { label: 'Brazil', value: 'BR', icon: '🇧🇷' },
    { label: 'Australia', value: 'AU', icon: '🇦🇺' },
    { label: 'Canada', value: 'CA', icon: '🇨🇦' },
    { label: 'Mexico', value: 'MX', icon: '🇲🇽', disabled: true },
  ];

  // Grouped options (for the search + groups demo)
  groupedFood: SelectOptionLike<string>[] = [
    {
      label: 'Fruits',
      options: [
        { label: 'Apple', value: 'apple', description: 'Crunchy and sweet' },
        { label: 'Banana', value: 'banana', description: 'Rich in potassium' },
        { label: 'Cherry', value: 'cherry' },
        { label: 'Date', value: 'date' },
        { label: 'Elderberry', value: 'elderberry' },
      ],
    },
    {
      label: 'Vegetables',
      options: [
        { label: 'Carrot', value: 'carrot' },
        { label: 'Broccoli', value: 'broccoli' },
        { label: 'Spinach', value: 'spinach' },
        { label: 'Tomato', value: 'tomato' },
      ],
    },
    {
      label: 'Bakery (closed)',
      disabled: true,
      options: [
        { label: 'Bread', value: 'bread' },
        { label: 'Croissant', value: 'croissant' },
      ],
    },
  ];

  // Huge dataset for the virtual scrolling demo
  largeDataset: SelectOption<number>[] = Array.from({ length: 10_000 }, (_, i) => ({
    label: `Option #${i + 1}`,
    value: i + 1,
    description: i % 7 === 0 ? `Special row #${i + 1}` : undefined,
  }));

  // ---- Bound values ----
  singleValue = signal<string | null>(null);
  multiValue = signal<string[]>([]);
  checkboxValue = signal<string[]>([]);
  selectAllValue = signal<string[]>([]);
  groupedValue = signal<string | null>(null);
  largeValue = signal<number | null>(null);

  // Reactive form
  readonly favoriteCountry = new FormControl<string | null>(null, [Validators.required]);

  lastChange = '';

  // ---- Handlers ----
  setTheme(theme: SelectTheme): void {
    this.selectedTheme = theme;
  }
  setSize(size: SelectSize): void {
    this.selectedSize = size;
  }
  setStatus(status: SelectStatus): void {
    this.selectedStatus = status;
  }
  setPlacement(placement: SelectPlacement): void {
    this.selectedPlacement = placement;
  }

  onChange(event: SelectChangeEvent<unknown>): void {
    this.lastChange = JSON.stringify(event.value);
  }

  resetAll(): void {
    this.singleValue.set(null);
    this.multiValue.set([]);
    this.checkboxValue.set([]);
    this.selectAllValue.set([]);
    this.groupedValue.set(null);
    this.largeValue.set(null);
    this.favoriteCountry.reset();
    this.lastChange = '';
  }
}

