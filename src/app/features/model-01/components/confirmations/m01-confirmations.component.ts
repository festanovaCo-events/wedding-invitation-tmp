import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TitleCoupleComponent } from '../../../shared/components/ui/title-couple/title-couple.component';
import { ModalComponent } from '../../../shared/components/common/modal/modal.component';
import { ContentConfirmationModalComponent } from '../../../shared/components/confirmations/content-confirmation-modal/content-confirmation-modal.component';
import { M01ConfirmationStatusComponent } from './confirmation-status/m01-confirmation-status.component';
import { M01DeclinedStatusComponent } from './declined-status/m01-declined-status.component';
import { M01ErrorStatusComponent } from './error-status/m01-error-status.component';
import { FEATURE_FLAGS as FLAGS } from '../../../shared/constants/feature-flags';
import { WEDDING_INFO } from '../../../shared/constants/wedding-info';
import { InvitationStateService } from '../../../shared/services/invitation-state.service';
import { ModalFlowService } from '../../../shared/services/modal-flow.service';
import { InvitationInfoResponse } from '../../../shared/interfaces/invitation.interface';

@Component({
  selector: 'app-m01-confirmations',
  standalone: true,
  imports: [
    CommonModule,
    TitleCoupleComponent,
    ModalComponent,
    ContentConfirmationModalComponent,
    M01ConfirmationStatusComponent,
    M01DeclinedStatusComponent,
    M01ErrorStatusComponent,
  ],
  templateUrl: './m01-confirmations.component.html',
  styleUrl: './m01-confirmations.component.css',
})
export class M01ConfirmationsComponent implements OnInit, OnDestroy {
  @ViewChild(ContentConfirmationModalComponent) confirmationModal!: ContentConfirmationModalComponent;
  
  isModalVisible = false;
  FEATURE_FLAGS = FLAGS;
  weddingInfo = WEDDING_INFO;
  invitationData: InvitationInfoResponse | null = null;
  isConfirmed = false;
  isDeclined = false;
  error: string | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private invitationStateService: InvitationStateService,
    private modalFlowService: ModalFlowService
  ) {}

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

    const openModalSubscription = this.modalFlowService.openConfirmationModal$.subscribe(() => {
      this.openModal();
    });
    this.subscriptions.push(openModalSubscription);
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
