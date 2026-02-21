import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { LottieComponent } from 'ngx-lottie';
import { FEATURE_FLAGS } from '../../../constants/feature-flags';
import { WEDDING_INFO } from '../../../constants/wedding-info';
import { CircularModalComponent } from '../../common/circular-modal/circular-modal.component';
import { ContentDressCodeModalComponent } from '../../contents/content-dress-code-modal/content-dress-code-modal.component';
import { ContentTipsModalComponent } from '../../contents/content-tips-modal/content-tips-modal.component';

interface CardInfo {
  title: string;
  description: string;
  label: string;
  path: string;
}

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [
    LottieComponent, 
    CommonModule,
    CircularModalComponent,
    ContentDressCodeModalComponent,
    ContentTipsModalComponent
  ],
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

  showDressCodeModal = false;
  showTipsModal = false;

  private animationItem: AnimationItem | undefined;

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  onCardClick(card: CardInfo) {
    if (card.title === 'Vestuario') {
      this.showDressCodeModal = true;
    } else if (card.title === 'Tips y Notas') {
      this.showTipsModal = true;
    }
    // Para "Música" no hacemos nada, el botón puede tener otra funcionalidad
  }

  closeDressCodeModal() {
    this.showDressCodeModal = false;
  }

  closeTipsModal() {
    this.showTipsModal = false;
  }
}
