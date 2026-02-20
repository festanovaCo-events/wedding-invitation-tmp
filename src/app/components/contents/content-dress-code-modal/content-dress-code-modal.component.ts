import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-dress-code-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-dress-code-modal.component.html',
  styleUrl: './content-dress-code-modal.component.css',
})
export class ContentDressCodeModalComponent {
  // Aquí puedes agregar el contenido del dress code
  dressCodeContent = 'Contenido Dress Code';
}
