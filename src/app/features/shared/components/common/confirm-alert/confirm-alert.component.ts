import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-alert.component.html',
})
export class ConfirmAlertComponent {
  @Input() title = '¿Estás seguro?';
  @Input() message = '';
  @Input() secondaryMessage = '';
  @Input() confirmLabel = 'Aceptar';
  @Input() cancelLabel = 'Cancelar';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
