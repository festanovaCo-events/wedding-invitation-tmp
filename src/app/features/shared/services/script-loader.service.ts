import { Injectable } from '@angular/core';

/** Carga jQuery y Slick de forma diferida para no bloquear el render inicial */
@Injectable({ providedIn: 'root' })
export class ScriptLoaderService {
  private loadPromise: Promise<void> | null = null;

  /** Carga jQuery y Slick (en orden). Resuelve cuando están listos */
  loadSlickCarouselDeps(): Promise<void> {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    const base = document.querySelector('base')?.href || '';
    const vendor = base ? new URL('vendor/jquery.min.js', base).href : '/vendor/jquery.min.js';
    const slick = base ? new URL('vendor/slick.min.js', base).href : '/vendor/slick.min.js';

    this.loadPromise = this.loadScript(vendor).then(() => this.loadScript(slick));

    return this.loadPromise;
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isScriptLoaded(src)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  private isScriptLoaded(src: string): boolean {
    const name = src.split('/').pop()?.split('?')[0] || '';
    return Array.from(document.scripts).some((s) => s.src && s.src.includes(name));
  }
}
