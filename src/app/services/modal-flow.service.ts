import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalFlowService {
  private welcomeModalAccepted = new Subject<void>();
  welcomeModalAccepted$ = this.welcomeModalAccepted.asObservable();

  emitWelcomeModalAccepted(): void {
    this.welcomeModalAccepted.next();
  }
}
