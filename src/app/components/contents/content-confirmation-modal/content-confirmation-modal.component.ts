import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { InvitationStateService } from '../../../services/invitation-state.service';
import { InvitationService } from '../../../services/invitation.service';
import { InvitationInfoResponse } from '../../../interfaces/invitation.interface';

@Component({
  selector: 'app-content-confirmation-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './content-confirmation-modal.component.html',
  styleUrl: './content-confirmation-modal.component.css',
})
export class ContentConfirmationModalComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter<void>();
  
  currentStep: 'confirmation' | 'loading' | 'guests' | 'decline-confirmation' = 'confirmation';
  isConfirmed: boolean | null = null;
  
  nameCurrent: string = '';
  listName: string[] = [];
  maximumQuotas: number = 7;
  registrationSent: boolean = false;
  hostName: string = '';
  private subscription?: Subscription;
  
  private token: string = '';

  get additionalGuests(): string[] {
    return this.listName.filter(name => name !== this.hostName);
  }

  get canAddMoreGuests(): boolean {
    return this.additionalGuests.length < (this.maximumQuotas - 1);
  }

  constructor(
    private invitationStateService: InvitationStateService,
    private invitationService: InvitationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subscription = this.invitationStateService.getInvitationData$().subscribe(data => {
      if (data) {
        this.token = data.data.invitation.token || '';
        
        this.hostName = data.data.invitation.name || '';
        this.maximumQuotas = data.data.available_seats || 7;
        
        if (this.hostName) {
          this.listName = [this.hostName];
        }
        
        if (data.data.invitation.guests && data.data.invitation.guests.length > 0) {
          const guestNames = data.data.invitation.guests.map(guest => guest.name);
          guestNames.forEach(guestName => {
            if (guestName !== this.hostName && !this.listName.includes(guestName)) {
              this.listName.push(guestName);
            }
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Recargar la información de la invitación después de aceptar o rechazar
   */
  private reloadInvitationData(): void {
    if (!this.token) {
      console.warn('No hay token disponible para recargar la información');
      return;
    }

    this.invitationStateService.setLoading(true);
    this.invitationService.getInvitationInfo(this.token).subscribe({
      next: (response) => {
        this.invitationStateService.setInvitationData(response);
        this.invitationStateService.setLoading(false);
      },
      error: (error) => {
        console.error('Error al recargar datos de invitación:', error);
        this.invitationStateService.setLoading(false);
      }
    });
  }

  onConfirmChange() {
    if (this.isConfirmed === true) {
      this.currentStep = 'loading';
      
      setTimeout(() => {
        this.currentStep = 'guests';
      }, 1500);
    } else if (this.isConfirmed === false) {
      this.currentStep = 'decline-confirmation';
    }
  }

  confirmDecline() {
    if (!this.token) {
      this.toastr.error('Error: No se encontró la información de la invitación', '', {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        closeButton: true,
        progressBar: true,
      });
      return;
    }

    this.currentStep = 'loading';

    this.invitationService.declineInvitation(this.token).subscribe({
      next: (response) => {
        this.reloadInvitationData();
        
        this.reset();
        this.closeModal.emit();
        
        setTimeout(() => {
          this.toastr.info('Lamentamos que no puedas asistir. ¡Esperamos verte en otra ocasión!', '', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            closeButton: true,
            progressBar: true,
          });
        }, 300);
      },
      error: (error) => {
        console.error('Error al rechazar la invitación:', error);
        this.currentStep = 'decline-confirmation';
        this.toastr.error('Error al rechazar la invitación. Por favor, intenta nuevamente.', '', {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          closeButton: true,
          progressBar: true,
        });
      }
    });
  }

  cancelDecline() {
    this.isConfirmed = null;
    this.currentStep = 'confirmation';
  }

  saveName() {
    const nombreTrim = this.nameCurrent.trim();
    if (
      nombreTrim &&
      this.canAddMoreGuests &&
      !this.listName.includes(nombreTrim) &&
      nombreTrim !== this.hostName
    ) {
      this.listName.push(nombreTrim);
      this.nameCurrent = '';
    }
  }

  deleteName(index: number) {
    const nombre = this.listName[index];
    if (nombre !== this.hostName) {
      this.listName.splice(index, 1);
    }
  }

  confirmSend() {
    if (this.listName.length < this.maximumQuotas) {
      const confirmacion = confirm(
        `Solo estás registrando ${this.listName.length} de ${this.maximumQuotas} cupos. ¿Estás seguro? No podrás modificar esto después.`
      );
      if (!confirmacion) return;
    }

    this.send();
  }

  send() {
    if (!this.token) {
      this.toastr.error('Error: No se encontró la información de la invitación', '', {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        closeButton: true,
        progressBar: true,
      });
      return;
    }

    this.currentStep = 'loading';
    this.registrationSent = true;

    const guestNames = [...this.listName];

    this.invitationService.acceptInvitation(this.token, guestNames).subscribe({
      next: (response) => {
        this.reloadInvitationData();
        
        this.reset();
        this.closeModal.emit();
        
        setTimeout(() => {
          this.toastr.success('¡Felicidades! Has sido agendado', '', {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            closeButton: true,
            progressBar: true,
          });
        }, 300);
      },
      error: (error) => {
        console.error('Error al aceptar la invitación:', error);
        this.currentStep = 'guests';
        this.registrationSent = false;
        this.toastr.error('Error al enviar la confirmación. Por favor, intenta nuevamente.', '', {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          closeButton: true,
          progressBar: true,
        });
      }
    });
  }

  reset() {
    this.currentStep = 'confirmation';
    this.isConfirmed = null;
    this.nameCurrent = '';
    this.listName = this.hostName ? [this.hostName] : [];
    this.registrationSent = false;
  }

  onClose() {
    this.reset();
    this.closeModal.emit();
  }
}
