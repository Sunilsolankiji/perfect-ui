import { Injectable, inject } from '@angular/core';
import { _CONFIG, CarouselConfig, defaultCarouselConfig } from './carousel.config';

@Injectable({ providedIn: 'root' })
export class CarouselService {
  private config: CarouselConfig = inject(_CONFIG, { optional: true }) ?? defaultCarouselConfig;
}
