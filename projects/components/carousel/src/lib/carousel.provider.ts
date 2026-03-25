import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { _CONFIG, CarouselConfig, defaultCarouselConfig } from './carousel.config';

export function provideCarousel(config: Partial<CarouselConfig> = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: _CONFIG,
      useValue: { ...defaultCarouselConfig, ...config }
    }
  ]);
}
