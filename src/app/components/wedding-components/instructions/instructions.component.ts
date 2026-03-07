import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { LottieComponent } from 'ngx-lottie';
import { FEATURE_FLAGS } from '../../../constants/feature-flags';
import { WEDDING_INFO } from '../../../constants/wedding-info';
import dress from 'assets/animations/dress.json';
import sounds from 'assets/animations/sounds.json';
import tips from 'assets/animations/tips.json';
import { CircularModalComponent } from '../../common/circular-modal/circular-modal.component';
import { ContentDressCodeModalComponent } from '../../contents/content-dress-code-modal/content-dress-code-modal.component';
import { ContentTipsModalComponent } from '../../contents/content-tips-modal/content-tips-modal.component';

type InstructionsAnimationKey = 'sounds' | 'dress' | 'tips';

interface CardInfo {
  title: string;
  description: string;
  label: string;
  animationKey: InstructionsAnimationKey;
}

const INSTRUCTIONS_ANIMATIONS: Record<InstructionsAnimationKey, object> = { dress, sounds, tips };

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
export class InstructionsComponent implements OnInit, OnDestroy {
  weddingInfo = WEDDING_INFO;
  
  cards: CardInfo[] = WEDDING_INFO.sections.instructions.cards.map(card => ({
    ...card,
    animationKey: (card.path?.includes('sounds') ? 'sounds' : card.path?.includes('dress') ? 'dress' : 'tips') as InstructionsAnimationKey,
  })).filter(card => {
    // Filtrar el card de Música si el feature flag está deshabilitado
    if (card.title === 'Música') {
      return FEATURE_FLAGS.MUSIC_CARD;
    }
    return true;
  });

  showDressCodeModal = false;
  showTipsModal = false;

  private animationItem: AnimationItem | undefined;

  ngOnInit(): void {
    // Las animaciones se cargan inmediatamente ya que las tarjetas están visibles
  }

  ngAfterViewInit(): void {
    // No necesitamos IntersectionObserver para estas tarjetas visibles
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  ngOnDestroy(): void {
    // No hay observers que limpiar
  }

  onCardClick(card: CardInfo) {
    if (card.title === 'Vestuario') {
      this.showDressCodeModal = true;
    } else if (card.title === 'Tips y Notas') {
      this.showTipsModal = true;
    }
    // Para "Música" no hacemos nada, el botón puede tener otra funcionalidad
  }

  getAnimationData(key: InstructionsAnimationKey) {
    return INSTRUCTIONS_ANIMATIONS[key];
  }

  closeDressCodeModal() {
    this.showDressCodeModal = false;
  }

  closeTipsModal() {
    this.showTipsModal = false;
  }
}
