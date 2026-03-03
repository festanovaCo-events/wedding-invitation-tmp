import {
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Wrapper que carga PortraitsComponent de forma diferida cuando entra en viewport.
 * Permite que Fancybox y ngx-slick-carousel vayan a un chunk separado.
 */
@Component({
  standalone: true,
  selector: 'app-portraits-wrapper',
  template: `
    <section #anchor class="portraits-anchor">
      @if (loading || loaded) {
        <ng-container #container></ng-container>
      }
      @if (loading && !loaded) {
        <div class="flex justify-center items-center min-h-[200px] absolute inset-x-0 pointer-events-none">
          <div class="w-10 h-10 border-2 border-slate-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    </section>
  `,
  imports: [CommonModule],
  host: { class: 'block relative' },
})
export class PortraitsWrapperComponent implements OnInit, OnDestroy {
  @ViewChild('anchor', { static: true }) anchor!: ElementRef<HTMLElement>;
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  loaded = false;
  loading = false;
  private observer: IntersectionObserver | null = null;

  constructor() {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.loaded && !this.loading) {
            this.loadPortraits();
          }
        });
      },
      { rootMargin: '100px', threshold: 0.01 }
    );
    this.observer.observe(this.anchor.nativeElement);
  }

  private async loadPortraits(): Promise<void> {
    this.loading = true;
    await new Promise((r) => setTimeout(r, 0)); // Esperar a que el container se renderice
    try {
      const { PortraitsComponent } = await import('./portraits.component');
      this.container?.clear();
      this.container?.createComponent(PortraitsComponent);
      this.loaded = true;
    } catch {
      // fallback: mostrar sección vacía
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
