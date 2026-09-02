import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEDDING_INFO } from '../../../constants/wedding-info';

@Component({
  selector: 'app-content-dress-code-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-dress-code-modal.component.html',
  styleUrl: './content-dress-code-modal.component.css',
})
export class ContentDressCodeModalComponent {
  dressCodeContent = WEDDING_INFO.sections.modals.dressCode.description;
}
