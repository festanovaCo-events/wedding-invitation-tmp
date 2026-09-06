import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { APP_BASE_HREF, provideCloudinaryLoader } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideCacheableAnimationLoader,
  provideLottieOptions,
} from 'ngx-lottie';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { INVITATION_PUBLIC_BASE } from './constants/invitation-public-base';

const CLOUDINARY_CLOUD = 'dwx09pwkr';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_BASE_HREF, useValue: `${INVITATION_PUBLIC_BASE}/` },
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
