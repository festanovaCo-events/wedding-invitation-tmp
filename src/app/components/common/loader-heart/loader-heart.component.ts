import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import heart from 'assets/animations/heart.json';

@Component({
  selector: 'app-loader-heart',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  templateUrl: './loader-heart.component.html',
  styleUrls: ['./loader-heart.component.css'],
})
export class LoaderHeartComponent {
  private animationItem: AnimationItem | undefined;

  options: AnimationOptions = {
    animationData: heart,
    loop: true,
    autoplay: true,
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
}
