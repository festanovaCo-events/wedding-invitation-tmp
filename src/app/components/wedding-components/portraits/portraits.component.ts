import { Component, OnDestroy, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { CommonModule, NgOptimizedImage } from '@angular/common';

// Importar ngx-slick-carousel
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Fancybox } from '@fancyapps/ui';
import { WEDDING_INFO } from '../../../constants/wedding-info';
import { ANIMATIONS_DATA } from '../../../data/animations.data';

@Component({
  selector: 'app-portraits',
  standalone: true,
  imports: [LottieComponent, CommonModule, SlickCarouselModule, NgOptimizedImage],
  templateUrl: './portraits.component.html',
  styleUrl: './portraits.component.css',
})
export class PortraitsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;
  
  weddingInfo = WEDDING_INFO;
  images = WEDDING_INFO.assets.portraits;
  private observer: IntersectionObserver | null = null;
  shouldLoadAnimation = false;

  options: AnimationOptions = {
    animationData: ANIMATIONS_DATA.camera,
    loop: true,
    autoplay: true,
  };

  animationItem: AnimationItem | undefined;

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    dots: true,
    infinite: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  ngOnInit(): void {
    setTimeout(() => {
      this.setupIntersectionObserver();
    }, 0);
  }

  private setupIntersectionObserver(): void {
    if (!this.lottieContainer?.nativeElement || !('IntersectionObserver' in window)) {
      this.shouldLoadAnimation = true;
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.shouldLoadAnimation = true;
            this.observer?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    this.observer.observe(this.lottieContainer.nativeElement);
  }

  ngAfterViewInit() {
    // Inicializar Fancybox para las imágenes con data-fancybox="gallery"
    Fancybox.bind('.slick-slide:not(.slick-cloned) [data-fancybox="gallery"]', {
      Thumbs: {},
      // Deshabilitar la actualización automática de la URL
      Hash: false,
      on: {
        close: () => {
          // Limpiar el hash de la URL cuando se cierra Fancybox
          if (window.location.hash) {
            // Usar history.replaceState para no agregar una entrada al historial
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        },
      },
    });
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
