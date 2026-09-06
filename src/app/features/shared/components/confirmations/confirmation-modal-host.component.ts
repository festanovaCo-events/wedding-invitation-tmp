import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '../common/modal/modal.component';
import { ContentConfirmationModalComponent } from './content-confirmation-modal/content-confirmation-modal.component';

@Component({
  selector: 'app-confirmation-modal-host',
  standalone: true,
  imports: [ModalComponent, ContentConfirmationModalComponent],
  template: `
    <app-modal [show]="show" (close)="onClose()">
      <app-content-confirmation-modal (closeModal)="onClose()" />
    </app-modal>
  `,
})
export class ConfirmationModalHostComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
