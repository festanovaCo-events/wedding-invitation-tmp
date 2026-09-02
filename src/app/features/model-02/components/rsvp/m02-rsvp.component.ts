import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import { WEDDING_INFO } from '../../../shared/constants/wedding-info';
import { MODEL_02_INFO } from '../../constants/model-02-info';
import { ConfirmationModalHostComponent } from '../../../shared/components/confirmations/confirmation-modal-host.component';
import { M01ConfirmationStatusComponent } from '../../../model-01/components/confirmations/confirmation-status/m01-confirmation-status.component';
import { M01DeclinedStatusComponent } from '../../../model-01/components/confirmations/declined-status/m01-declined-status.component';
import { M01ErrorStatusComponent } from '../../../model-01/components/confirmations/error-status/m01-error-status.component';
import { InvitationStateService } from '../../../shared/services/invitation-state.service';
import { ModalFlowService } from '../../../shared/services/modal-flow.service';
import { InvitationInfoResponse } from '../../../shared/interfaces/invitation.interface';

@Component({
  selector: 'app-m02-rsvp',
  standalone: true,
  imports: [
    CommonModule,
    HugeiconsIconComponent,
    ConfirmationModalHostComponent,
    M01ConfirmationStatusComponent,
    M01DeclinedStatusComponent,
    M01ErrorStatusComponent,
  ],
  templateUrl: './m02-rsvp.component.html',
})
export class M02RsvpComponent implements OnInit, OnDestroy {
  readonly weddingInfo = WEDDING_INFO;
  readonly info = MODEL_02_INFO;
  readonly icon = CheckmarkCircle02Icon;

  isConfirmationModalVisible = false;
  invitationData: InvitationInfoResponse | null = null;
  isConfirmed = false;
  isDeclined = false;
  error: string | null = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private invitationStateService: InvitationStateService,
    private modalFlowService: ModalFlowService,
  ) {}

  ngOnInit(): void {
    this.error = this.invitationStateService.getError();

    this.subscriptions.push(
      this.invitationStateService.getInvitationData$().subscribe((data) => {
        this.invitationData = data;
        this.isConfirmed = data?.data.invitation.status === 'ACCEPTED';
        this.isDeclined = data?.data.invitation.status === 'DECLINED';
      }),
    );

    this.subscriptions.push(
      this.invitationStateService.getError$().subscribe((error) => {
        this.error = error;
        if (error) {
          this.isConfirmationModalVisible = false;
        }
      }),
    );

    this.subscriptions.push(
      this.modalFlowService.openConfirmationModal$.subscribe(() => {
        this.openConfirmation();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  get canConfirm(): boolean {
    return !this.isConfirmed && !this.isDeclined && !this.error;
  }

  openConfirmation(): void {
    if (!this.canConfirm) {
      return;
    }
    this.isConfirmationModalVisible = true;
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalVisible = false;
  }
}
