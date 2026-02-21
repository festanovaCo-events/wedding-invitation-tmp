import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { WEDDING_INFO } from '../../../constants/wedding-info';

@Component({
  selector: 'app-banner-instagram',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './banner-instagram.component.html',
  styleUrl: './banner-instagram.component.css'
})
export class BannerInstagramComponent {
  weddingInfo = WEDDING_INFO;
  
   options: AnimationOptions = {
      path: WEDDING_INFO.animations.instagram,
      loop: true,
      autoplay: true,
    };

  private animationItem: AnimationItem | undefined;

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
}
