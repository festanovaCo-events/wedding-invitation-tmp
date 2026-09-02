import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalFlowService {
  private welcomeModalAccepted = new Subject<void>();
  welcomeModalAccepted$ = this.welcomeModalAccepted.asObservable();

  private openConfirmationModal = new Subject<void>();
  openConfirmationModal$ = this.openConfirmationModal.asObservable();

  emitWelcomeModalAccepted(): void {
    this.welcomeModalAccepted.next();
  }

  requestOpenConfirmationModal(): void {
    this.openConfirmationModal.next();
  }
}
