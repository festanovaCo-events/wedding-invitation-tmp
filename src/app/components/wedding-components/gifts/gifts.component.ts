import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { WEDDING_INFO } from '../../../constants/wedding-info';

@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.css',
})
export class GiftsComponent {
  private animationItem: AnimationItem | undefined;
  weddingInfo = WEDDING_INFO;

  options: AnimationOptions = {
    path: WEDDING_INFO.animations.gift,
    loop: true,
    autoplay: true,
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
}
