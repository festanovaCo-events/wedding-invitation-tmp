import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationInfoResponse } from '../../../../shared/interfaces/invitation.interface';

@Component({
  selector: 'app-confirmation-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-status.component.html',
  styleUrl: './confirmation-status.component.css',
})
export class ConfirmationStatusComponent {
  @Input() invitationData: InvitationInfoResponse | null = null;

  get confirmedGuestNames(): string[] {
    if (!this.invitationData) {
      return [];
    }

    const { invitation } = this.invitationData.data;

    if (invitation.guests?.length > 0) {
      return invitation.guests.map(guest => guest.name);
    }

    return invitation.name ? [invitation.name] : [];
  }
}
