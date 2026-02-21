import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { TitleCoupleComponent } from "../../ui/title-couple/title-couple.component";
import { WEDDING_INFO } from '../../../constants/wedding-info';
import arrowContinue from 'assets/animations/arrow_continue.json';
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
    animationData: arrowContinue,
    loop: true,
    autoplay: true,
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
}
