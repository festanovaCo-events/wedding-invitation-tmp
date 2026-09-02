import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationItem } from 'lottie-web';
import { TitleCoupleComponent } from "../../../shared/components/ui/title-couple/title-couple.component";
import { WEDDING_INFO } from '../../../shared/constants/wedding-info';
import { ACTIVE_THEME } from '../../../shared/themes/active-theme';
@Component({
  selector: 'app-banner-home',
  standalone: true,
  imports: [CommonModule, LottieComponent, TitleCoupleComponent],
  templateUrl: './banner-home.component.html',
  styleUrl: './banner-home.component.css'
})
export class BannerHomeComponent {
  private animationItem: AnimationItem | undefined;
  weddingInfo = WEDDING_INFO;

  options: AnimationOptions = {
    animationData: ACTIVE_THEME.animations.arrowContinue,
    loop: true,
    autoplay: true,
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
}
