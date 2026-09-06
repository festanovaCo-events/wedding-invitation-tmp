import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { WEDDING_INFO } from '../../../shared/constants/wedding-info';
import { ACTIVE_THEME } from '../../../shared/themes/active-theme';

@Component({
  selector: 'app-m01-gifts',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  templateUrl: './m01-gifts.component.html',
  styleUrl: './m01-gifts.component.css',
})
export class M01GiftsComponent implements OnInit, OnDestroy {
  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;
  
  private animationItem: AnimationItem | undefined;
  private observer: IntersectionObserver | null = null;
  weddingInfo = WEDDING_INFO;
  shouldLoadAnimation = false;

  options: AnimationOptions = {
    animationData: ACTIVE_THEME.animations.gift,
    loop: true,
    autoplay: true,
  };

  ngOnInit(): void {
    // Usar setTimeout para asegurar que el ViewChild esté disponible
    setTimeout(() => {
      this.setupIntersectionObserver();
    }, 0);
  }

  private setupIntersectionObserver(): void {
    if (!this.lottieContainer?.nativeElement || !('IntersectionObserver' in window)) {
      // Fallback: cargar inmediatamente si no hay soporte
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

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
