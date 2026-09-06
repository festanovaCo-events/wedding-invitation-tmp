import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEDDING_INFO } from '../../../constants/wedding-info';

@Component({
  selector: 'app-content-tips-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-tips-modal.component.html',
  styleUrl: './content-tips-modal.component.css',
})
export class ContentTipsModalComponent {
  tipsContent = WEDDING_INFO.sections.modals.tipsAndNotes.description;
}
