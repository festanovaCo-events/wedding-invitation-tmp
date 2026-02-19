import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { LottieComponent } from 'ngx-lottie';
import { FEATURE_FLAGS } from '../../../constants/feature-flags';
import { WEDDING_INFO } from '../../../constants/wedding-info';

interface CardInfo {
  title: string;
  description: string;
  label: string;
  path: string;
}

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [LottieComponent, CommonModule],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
})
export class InstructionsComponent {
  weddingInfo = WEDDING_INFO;
  
  cards: CardInfo[] = WEDDING_INFO.sections.instructions.cards.filter(card => {
    // Filtrar el card de Música si el feature flag está deshabilitado
    if (card.title === 'Música') {
      return FEATURE_FLAGS.MUSIC_CARD;
    }
    return true;
  });

  private animationItem: AnimationItem | undefined;

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
}
