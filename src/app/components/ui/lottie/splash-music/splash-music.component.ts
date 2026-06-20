import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { ACTIVE_THEME } from '../../../../themes/active-theme';

@Component({
  selector: 'app-splash-music',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  templateUrl: './splash-music.component.html',
})
export class SplashMusicComponent implements OnInit {
  @Output() iconClicked = new EventEmitter<void>();
  private animationItem: AnimationItem | undefined;
  shouldLoadAnimation = false;

  options: AnimationOptions = {
    animationData: ACTIVE_THEME.animations.music,
    loop: true,
    autoplay: true,
  };

  ngOnInit(): void {
    // Cargar la animación de forma diferida para no bloquear la ruta crítica
    // Esperar a que el contenido principal se haya renderizado completamente
    if ('requestIdleCallback' in window) {
      // Usar requestIdleCallback si está disponible (cuando el navegador está inactivo)
      (window as any).requestIdleCallback(() => {
        this.shouldLoadAnimation = true;
      }, { timeout: 2000 }); // Timeout de 2 segundos máximo
    } else {
      // Fallback: cargar después de un delay significativo
      // Esto asegura que el contenido principal ya se renderizó
      setTimeout(() => {
        this.shouldLoadAnimation = true;
      }, 2000); // Delay de 2 segundos para asegurar que la página principal se renderizó
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  onClick(): void {
    this.iconClicked.emit();
  }

  pauseAnimation(): void {
    this.animationItem?.pause();
  }

  playAnimation(): void {
    this.animationItem?.play();
  }
}
