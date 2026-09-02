import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-circular-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circular-modal.component.html',
  styleUrl: './circular-modal.component.css',
})
export class CircularModalComponent {
  @Input() show = false;
  @Input() iconPath?: string;
  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }
}
