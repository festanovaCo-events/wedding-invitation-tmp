import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { WEDDING_INFO } from '../../../shared/constants/wedding-info';
import { ACTIVE_THEME } from '../../../shared/themes/active-theme';

@Component({
  selector: 'app-wedding-countdown',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './wedding-countdown.component.html',
  styleUrl: './wedding-countdown.component.css',
})
export class WeddingCountdownComponent implements OnInit, OnDestroy {
  private animationItem: AnimationItem | undefined;
  weddingInfo = WEDDING_INFO;

  options: AnimationOptions = {
    animationData: ACTIVE_THEME.animations.heartPulse,
    loop: true,
    autoplay: true,
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  targetDate = new Date(WEDDING_INFO.dates.weddingDate);
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  private subscription!: Subscription;

  ngOnInit(): void {
    this.updateCountdown();
    this.subscription = interval(1000).subscribe(() => this.updateCountdown());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateCountdown(): void {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      this.days = this.hours = this.minutes = this.seconds = 0;
      return;
    }

    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }
}
