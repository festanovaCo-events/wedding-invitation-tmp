import { Component, OnDestroy, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Fancybox } from '@fancyapps/ui';
import { WEDDING_INFO } from '../../../shared/constants/wedding-info';
import { ScriptLoaderService } from '../../../shared/services/script-loader.service';
import { ACTIVE_THEME } from '../../../shared/themes/active-theme';

@Component({
  selector: 'app-m01-portraits',
  standalone: true,
  imports: [LottieComponent, CommonModule, SlickCarouselModule, NgOptimizedImage],
  templateUrl: './m01-portraits.component.html',
  styleUrl: './m01-portraits.component.css',
})
export class M01PortraitsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;

  weddingInfo = WEDDING_INFO;
  images = WEDDING_INFO.assets.portraits;
  private observer: IntersectionObserver | null = null;
  shouldLoadAnimation = false;
  carouselReady = false;

  options: AnimationOptions = {
    animationData: ACTIVE_THEME.animations.camera,
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

  constructor(private scriptLoader: ScriptLoaderService) {}

  ngOnInit(): void {
    this.scriptLoader.loadSlickCarouselDeps().then(() => {
      this.carouselReady = true;
      setTimeout(() => this.bindFancybox(), 0);
    });
    setTimeout(() => {
      this.setupIntersectionObserver();
    }, 0);
  }

  private bindFancybox(): void {
    Fancybox.bind('.slick-slide:not(.slick-cloned) [data-fancybox="gallery"]', {
      Thumbs: {},
      Hash: false,
      on: {
        close: () => {
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        },
      },
    });
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
    // Fancybox se enlaza en bindFancybox() tras cargar scripts
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
