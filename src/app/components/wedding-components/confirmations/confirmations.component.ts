import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCoupleComponent } from '../../ui/title-couple/title-couple.component';
import { ModalComponent } from '../../common/modal/modal.component';
import { ContentConfirmationModalComponent } from '../../contents/content-confirmation-modal/content-confirmation-modal.component';
import { FEATURE_FLAGS as FLAGS } from '../../../constants/feature-flags';
import { WEDDING_INFO } from '../../../constants/wedding-info';

@Component({
  selector: 'app-confirmations',
  standalone: true,
  imports: [
    CommonModule,
    TitleCoupleComponent,
    ModalComponent,
    ContentConfirmationModalComponent,
  ],
  templateUrl: './confirmations.component.html',
  styleUrl: './confirmations.component.css',
})
export class ConfirmationsComponent {
  isModalVisible = false;
  FEATURE_FLAGS = FLAGS;
  weddingInfo = WEDDING_INFO;

  get visibleOptionsCount(): number {
    let count = 1; // "Confirmar asistencia a ceremonia" siempre está visible
    if (this.FEATURE_FLAGS.SUGGEST_SONG) count++;
    if (this.FEATURE_FLAGS.SCHEDULE_PARTY) count++;
    if (this.FEATURE_FLAGS.SCHEDULE_CEREMONY) count++;
    return count;
  }

  get isSingleOption(): boolean {
    return this.visibleOptionsCount === 1;
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
