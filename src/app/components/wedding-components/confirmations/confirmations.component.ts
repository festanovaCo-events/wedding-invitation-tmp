import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TitleCoupleComponent } from '../../ui/title-couple/title-couple.component';
import { ModalComponent } from '../../common/modal/modal.component';
import { ContentConfirmationModalComponent } from '../../contents/content-confirmation-modal/content-confirmation-modal.component';
import { ConfirmationStatusComponent } from './confirmation-status/confirmation-status.component';
import { DeclinedStatusComponent } from './declined-status/declined-status.component';
import { ErrorStatusComponent } from './error-status/error-status.component';
import { FEATURE_FLAGS as FLAGS } from '../../../constants/feature-flags';
import { WEDDING_INFO } from '../../../constants/wedding-info';
import { InvitationStateService } from '../../../services/invitation-state.service';
import { InvitationInfoResponse } from '../../../interfaces/invitation.interface';

@Component({
  selector: 'app-confirmations',
  standalone: true,
  imports: [
    CommonModule,
    TitleCoupleComponent,
    ModalComponent,
    ContentConfirmationModalComponent,
    ConfirmationStatusComponent,
    DeclinedStatusComponent,
    ErrorStatusComponent,
  ],
  templateUrl: './confirmations.component.html',
  styleUrl: './confirmations.component.css',
})
export class ConfirmationsComponent implements OnInit, OnDestroy {
  @ViewChild(ContentConfirmationModalComponent) confirmationModal!: ContentConfirmationModalComponent;
  
  isModalVisible = false;
  FEATURE_FLAGS = FLAGS;
  weddingInfo = WEDDING_INFO;
  invitationData: InvitationInfoResponse | null = null;
  isConfirmed = false;
  isDeclined = false;
  error: string | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private invitationStateService: InvitationStateService) {}

  ngOnInit(): void {
    const dataSubscription = this.invitationStateService.getInvitationData$().subscribe(data => {
      this.invitationData = data;
      this.isConfirmed = data?.data.invitation.status === 'ACCEPTED';
      this.isDeclined = data?.data.invitation.status === 'DECLINED';
    });
    this.subscriptions.push(dataSubscription);

    const errorSubscription = this.invitationStateService.getError$().subscribe(error => {
      this.error = error;
      if (error) {
        this.isModalVisible = false;
      }
    });
    this.subscriptions.push(errorSubscription);

    this.error = this.invitationStateService.getError();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get visibleOptionsCount(): number {
    let count = 1;
    if (this.FEATURE_FLAGS.SUGGEST_SONG) count++;
    if (this.FEATURE_FLAGS.SCHEDULE_PARTY) count++;
    if (this.FEATURE_FLAGS.SCHEDULE_CEREMONY) count++;
    return count;
  }

  get isSingleOption(): boolean {
    return this.visibleOptionsCount === 1;
  }

  openModal() {
    if (this.error) {
      return;
    }

    if (this.confirmationModal) {
      this.confirmationModal.reset();
    }

    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  onModalClose() {
    if (this.confirmationModal) {
      this.confirmationModal.reset();
    }
    this.closeModal();
  }

}
