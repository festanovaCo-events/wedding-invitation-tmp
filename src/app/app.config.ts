import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideCacheableAnimationLoader,
  provideLottieOptions,
} from 'ngx-lottie';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';

const CLOUDINARY_CLOUD = 'dwx09pwkr';

// Loader personalizado que maneja tanto Cloudinary como URLs externas (Unsplash)
function customImageLoader(config: ImageLoaderConfig): string {
  const src = config.src;
  
  // Si es una URL completa (http:// o https://), devolverla tal cual
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  // Si no, usar Cloudinary
  const params = config.loaderParams as { transform?: string } || {};
  const transform = params.transform || 'c_fill';
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/${transform}/${src}`;
}

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
    {
      provide: IMAGE_LOADER,
      useValue: customImageLoader,
    },
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
  ],
};
