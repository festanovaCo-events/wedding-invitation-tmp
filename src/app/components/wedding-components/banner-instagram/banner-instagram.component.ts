import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { WEDDING_INFO } from '../../../constants/wedding-info';
import instagram from 'assets/animations/instagram.json';

@Component({
  selector: 'app-banner-instagram',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  templateUrl: './banner-instagram.component.html',
  styleUrl: './banner-instagram.component.css'
})
export class BannerInstagramComponent implements OnInit, OnDestroy {
  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;
  
  private animationItem: AnimationItem | undefined;
  private observer: IntersectionObserver | null = null;
  weddingInfo = WEDDING_INFO;
  shouldLoadAnimation = false;
  
  options: AnimationOptions = {
    animationData: instagram,
    loop: true,
    autoplay: true,
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

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
