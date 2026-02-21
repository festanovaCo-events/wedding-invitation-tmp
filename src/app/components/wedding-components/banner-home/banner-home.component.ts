import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { TitleCoupleComponent } from "../../ui/title-couple/title-couple.component";
import { WEDDING_INFO } from '../../../constants/wedding-info';
import { ANIMATIONS_DATA } from '../../../data/animations.data';
@Component({
  selector: 'app-banner-home',
  standalone: true,
  imports: [LottieComponent, TitleCoupleComponent],
  templateUrl: './banner-home.component.html',
  styleUrl: './banner-home.component.css'
})
export class BannerHomeComponent {
  private animationItem: AnimationItem | undefined;
  weddingInfo = WEDDING_INFO;

  options: AnimationOptions = {
    animationData: ANIMATIONS_DATA.arrowContinue,
    loop: true,
    autoplay: true,
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
}
