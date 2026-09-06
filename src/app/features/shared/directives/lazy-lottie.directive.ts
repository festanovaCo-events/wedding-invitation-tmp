import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Directive({
  selector: '[appLazyLottie]',
  standalone: true
})
export class LazyLottieDirective implements OnInit, OnDestroy {
  @Input() appLazyLottie: AnimationOptions | null = null;
  @Input() rootMargin: string = '50px'; // Cargar cuando esté a 50px de ser visible

  private observer: IntersectionObserver | null = null;
  private hasLoaded = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Solo crear el observer si el navegador lo soporta
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.hasLoaded) {
              this.loadAnimation();
              this.observer?.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: this.rootMargin,
          threshold: 0.1
        }
      );

      this.observer.observe(this.el.nativeElement);
    } else {
      // Fallback: cargar inmediatamente si no hay soporte para IntersectionObserver
      this.loadAnimation();
    }
  }

  private loadAnimation(): void {
    if (this.hasLoaded || !this.appLazyLottie) return;
    
    this.hasLoaded = true;
    // Marcar el elemento para que el componente padre sepa que debe cargar la animación
    this.renderer.setAttribute(this.el.nativeElement, 'data-lottie-ready', 'true');
    
    // Disparar un evento personalizado para notificar al componente
    const event = new CustomEvent('lottie-ready', { 
      detail: { options: this.appLazyLottie },
      bubbles: true 
    });
    this.el.nativeElement.dispatchEvent(event);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
