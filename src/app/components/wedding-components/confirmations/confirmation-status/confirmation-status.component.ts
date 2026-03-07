import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationInfoResponse } from '../../../../interfaces/invitation.interface';

@Component({
  selector: 'app-confirmation-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-status.component.html',
  styleUrl: './confirmation-status.component.css',
})
export class ConfirmationStatusComponent {
  @Input() invitationData: InvitationInfoResponse | null = null;
}
