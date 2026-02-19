import { Component, OnDestroy } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { CommonModule } from '@angular/common';

// Importar ngx-slick-carousel
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Fancybox } from '@fancyapps/ui';

@Component({
  selector: 'app-portraits',
  standalone: true,
  imports: [LottieComponent, CommonModule, SlickCarouselModule],
  templateUrl: './portraits.component.html',
  styleUrl: './portraits.component.css',
})
export class PortraitsComponent implements OnDestroy {
  images = [
    {
      thumb:
        'https://res.cloudinary.com/dwx09pwkr/image/upload/v1755103602/Wedding/dowktzuqunplps4ncqgn.jpg',
      full: 'https://res.cloudinary.com/dwx09pwkr/image/upload/v1755103602/Wedding/dowktzuqunplps4ncqgn.jpg',
    },
    {
      thumb:
        'https://res.cloudinary.com/dwx09pwkr/image/upload/v1755103602/Wedding/wjspdvkckwczd5trlb9w.jpg',
      full: 'https://res.cloudinary.com/dwx09pwkr/image/upload/v1755103602/Wedding/wjspdvkckwczd5trlb9w.jpg',
    },
    {
      thumb:
        'https://res.cloudinary.com/dwx09pwkr/image/upload/v1755103602/Wedding/nzubkb4sl784chxg1oap.jpg',
      full: 'https://res.cloudinary.com/dwx09pwkr/image/upload/v1755103602/Wedding/nzubkb4sl784chxg1oap.jpg',
    },
    {
      thumb:
        'https://res.cloudinary.com/dwx09pwkr/image/upload/v1755103602/Wedding/cmyeakepkcxvjdxwxgqy.jpg',
      full: 'https://res.cloudinary.com/dwx09pwkr/image/upload/v1755103602/Wedding/cmyeakepkcxvjdxwxgqy.jpg',
    },
    {
      thumb:
        'https://res.cloudinary.com/dwx09pwkr/image/upload/v1755103602/Wedding/omzkk5dk8tmbeyo3yhzq.jpg',
      full: 'https://res.cloudinary.com/dwx09pwkr/image/upload/v1755103602/Wedding/omzkk5dk8tmbeyo3yhzq.jpg',
    },
  ];

  options: AnimationOptions = {
    path: 'assets/animations/camera.json',
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
