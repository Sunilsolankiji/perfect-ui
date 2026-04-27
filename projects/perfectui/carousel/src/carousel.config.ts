import { InjectionToken } from '@angular/core';

export interface CarouselConfig {
  // Add configuration options here
}

export const _CONFIG = new InjectionToken<CarouselConfig>('_CONFIG');

export const defaultCarouselConfig: CarouselConfig = {
  // Default values
};
