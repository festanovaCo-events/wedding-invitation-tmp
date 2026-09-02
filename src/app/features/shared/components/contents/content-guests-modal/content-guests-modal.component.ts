import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InvitationStateService } from '../../../services/invitation-state.service';
import { InvitationInfoResponse } from '../../../interfaces/invitation.interface';
import { ConfirmAlertComponent } from '../../common/confirm-alert/confirm-alert.component';

@Component({
  selector: 'app-content-guests-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, ConfirmAlertComponent],
  templateUrl: './content-guests-modal.component.html',
  styleUrl: './content-guests-modal.component.css',
})
export class ContentGuestsModalComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter<void>();
  
  nameCurrent: string = '';
  listName: string[] = [];
  maximumQuotas: number = 7;
  registrationSent: boolean = false;
  hostName: string = '';
  showPartialQuotasConfirm = false;
  private subscription?: Subscription;

  constructor(private invitationStateService: InvitationStateService) {}

  ngOnInit(): void {
    this.subscription = this.invitationStateService.getInvitationData$().subscribe(data => {
      if (data) {
        this.hostName = data.data.invitation.name || '';
        
        this.maximumQuotas = data.data.available_seats || 7;
        
        if (data.data.invitation.guests && data.data.invitation.guests.length > 0) {
          this.listName = data.data.invitation.guests.map(guest => guest.name);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  saveName() {
    const nombreTrim = this.nameCurrent.trim();
    if (
      nombreTrim &&
      this.listName.length < this.maximumQuotas &&
      !this.listName.includes(nombreTrim)
    ) {
      this.listName.push(nombreTrim);
      this.nameCurrent = '';
    }
  }

  deleteName(index: number) {
    this.listName.splice(index, 1);
  }

  confirmSend() {
    if (this.listName.length < this.maximumQuotas) {
      this.showPartialQuotasConfirm = true;
      return;
    }

    this.send();
  }

  confirmPartialSend() {
    this.showPartialQuotasConfirm = false;
    this.send();
  }

  cancelPartialSend() {
    this.showPartialQuotasConfirm = false;
  }

  get partialQuotasMessage(): string {
    return `Solo estás registrando ${this.listName.length} de ${this.maximumQuotas} cupos.`;
  }

  send() {
    alert('Acompañantes confirmados: ' + this.listName.join(', '));
    this.registrationSent = true;
    setTimeout(() => {
      this.closeModal.emit();
    }, 1500);
  }
}
