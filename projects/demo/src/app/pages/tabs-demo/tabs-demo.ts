import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  PuiTab,
  PuiTabLabel,
  PuiTabs,
  TabChangeEvent,
  TabsAlign,
  TabsOrientation,
  TabsSize,
  TabsVariant,
} from '@sunilsolankiji/perfectui/tabs';

@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, PuiTabs, PuiTab, PuiTabLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabs-demo.html',
  styleUrl: './tabs-demo.css',
})
export class TabsDemoComponent {
  readonly packageName = '@sunilsolankiji/perfectui/tabs';

  // Variant pickers
  readonly variant = signal<TabsVariant>('line');
  readonly orientation = signal<TabsOrientation>('horizontal');
  readonly size = signal<TabsSize>('medium');
  readonly align = signal<TabsAlign>('start');
  readonly lazy = signal<boolean>(false);
  readonly animated = signal<boolean>(true);
  readonly disabled = signal<boolean>(false);

  // Two-way bound active index for the main playground.
  readonly active = signal<number>(0);

  // Event log
  readonly lastChange = signal<TabChangeEvent | null>(null);

  readonly variants: TabsVariant[] = ['line', 'filled', 'pills', 'bordered'];
  readonly sizes: TabsSize[] = ['small', 'medium', 'large'];
  readonly aligns: TabsAlign[] = ['start', 'center', 'end', 'stretch'];

  setVariant(v: TabsVariant): void { this.variant.set(v); }
  setOrientation(v: TabsOrientation): void { this.orientation.set(v); }
  setSize(v: TabsSize): void { this.size.set(v); }
  setAlign(v: TabsAlign): void { this.align.set(v); }
  toggleLazy(): void { this.lazy.update(v => !v); }
  toggleAnimated(): void { this.animated.update(v => !v); }
  toggleDisabled(): void { this.disabled.update(v => !v); }

  onTabChange(event: TabChangeEvent): void {
    this.lastChange.set(event);
  }
}

