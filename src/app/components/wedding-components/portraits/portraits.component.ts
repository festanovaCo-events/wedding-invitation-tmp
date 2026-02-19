import { Component, OnDestroy } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { CommonModule } from '@angular/common';

// Importar ngx-slick-carousel
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Fancybox } from '@fancyapps/ui';
import { WEDDING_INFO } from '../../../constants/wedding-info';

@Component({
  selector: 'app-portraits',
  standalone: true,
  imports: [LottieComponent, CommonModule, SlickCarouselModule],
  templateUrl: './portraits.component.html',
  styleUrl: './portraits.component.css',
})
export class PortraitsComponent implements OnDestroy {
  weddingInfo = WEDDING_INFO;
  images = WEDDING_INFO.assets.portraits;

  options: AnimationOptions = {
    path: WEDDING_INFO.animations.camera,
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
          slidesToShow: 3,
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

  ngAfterViewInit() {
    // Inicializar Fancybox para las imágenes con data-fancybox="gallery"
    Fancybox.bind('.slick-slide:not(.slick-cloned) [data-fancybox="gallery"]', {
      Thumbs: {},
      // Puedes agregar más opciones aquí
    });
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  ngOnDestroy() {
    // aquí limpia si fuera necesario
  }
}
