import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideCloudinaryLoader } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideCacheableAnimationLoader,
  provideLottieOptions,
} from 'ngx-lottie';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';

const CLOUDINARY_CLOUD = 'dwx09pwkr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideLottieOptions({
      player: () =>
        import(
          'lottie-web/build/player/lottie_light.min.js'
        ),
    }),
    provideCacheableAnimationLoader(),
    provideRouter(routes),
    provideCloudinaryLoader(`https://res.cloudinary.com/${CLOUDINARY_CLOUD}`),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
  ],
};
