import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { LottieComponent } from 'ngx-lottie';
import { FEATURE_FLAGS } from '../../../shared/constants/feature-flags';
import { WEDDING_INFO } from '../../../shared/constants/wedding-info';
import { ACTIVE_THEME } from '../../../shared/themes/active-theme';
import { CircularModalComponent } from '../../../shared/components/common/circular-modal/circular-modal.component';
import { ContentDressCodeModalComponent } from '../../../shared/components/contents/content-dress-code-modal/content-dress-code-modal.component';
import { ContentTipsModalComponent } from '../../../shared/components/contents/content-tips-modal/content-tips-modal.component';

type InstructionsAnimationKey = 'sounds' | 'dress' | 'tips';

interface CardInfo {
  title: string;
  description: string;
  label: string;
  animationKey: InstructionsAnimationKey;
}

const INSTRUCTIONS_ANIMATIONS: Record<InstructionsAnimationKey, object> = {
  dress: ACTIVE_THEME.animations.dress,
  sounds: ACTIVE_THEME.animations.sounds,
  tips: ACTIVE_THEME.animations.tips,
};

@Component({
  selector: 'app-m01-instructions',
  standalone: true,
  imports: [
    LottieComponent, 
    CommonModule,
    CircularModalComponent,
    ContentDressCodeModalComponent,
    ContentTipsModalComponent
  ],
  templateUrl: './m01-instructions.component.html',
  styleUrl: './m01-instructions.component.css',
})
export class M01InstructionsComponent implements OnInit, OnDestroy {
  weddingInfo = WEDDING_INFO;
  theme = ACTIVE_THEME;
  
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
