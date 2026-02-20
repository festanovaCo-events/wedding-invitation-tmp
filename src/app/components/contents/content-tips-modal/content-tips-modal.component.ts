import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-tips-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-tips-modal.component.html',
  styleUrl: './content-tips-modal.component.css',
})
export class ContentTipsModalComponent {
  // Aquí puedes agregar el contenido de tips y notas
  tipsContent = 'Contenido Tips y Notas';
}
