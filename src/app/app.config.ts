import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideCloudinaryLoader } from '@angular/common';
import {
  provideCacheableAnimationLoader,
  provideLottieOptions,
} from 'ngx-lottie';

import { routes } from './app.routes';

const CLOUDINARY_CLOUD = 'dwx09pwkr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideLottieOptions({
      player: () =>
        import(
          'lottie-web/build/player/lottie_light.min.js'
        ),
    }),
    provideCacheableAnimationLoader(),
    provideRouter(routes),
    provideCloudinaryLoader(`https://res.cloudinary.com/${CLOUDINARY_CLOUD}`),
  ],
};
