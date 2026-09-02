import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { M01BannerHomeComponent } from '../../components/banner-home/m01-banner-home.component';
import { M01WeddingCountdownComponent } from '../../components/wedding-countdown/m01-wedding-countdown.component';
import { M01EventScheduleComponent } from '../../components/event-schedule/m01-event-schedule.component';
import { M01PortraitsWrapperComponent } from '../../components/portraits/m01-portraits-wrapper.component';
import { M01InstructionsComponent } from '../../components/instructions/m01-instructions.component';
import { M01GiftsComponent } from '../../components/gifts/m01-gifts.component';
import { M01BannerInstagramComponent } from '../../components/banner-instagram/m01-banner-instagram.component';
import { M01ConfirmationsComponent } from '../../components/confirmations/m01-confirmations.component';
import { ModalComponent } from '../../../shared/components/common/modal/modal.component';
import { ModalFlowService } from '../../../shared/services/modal-flow.service';
import { InvitationService } from '../../../shared/services/invitation.service';
import { InvitationStateService } from '../../../shared/services/invitation-state.service';
import { shouldShowExpiredInvitationPage } from '../../../shared/utils/confirmation-deadline';

@Component({
  selector: 'app-model-01-page',
  standalone: true,
  imports: [
    CommonModule,
    M01BannerHomeComponent,
    M01WeddingCountdownComponent,
    M01EventScheduleComponent,
    M01PortraitsWrapperComponent,
    M01InstructionsComponent,
    M01GiftsComponent,
    M01BannerInstagramComponent,
    M01ConfirmationsComponent,
    ModalComponent,
  ],
  templateUrl: './model-01-page.component.html',
})
export class Model01PageComponent implements OnInit, OnDestroy {
  showConfirmationGuide = false;
  private readonly STORAGE_KEY = 'confirmation_guide_shown';
  private welcomeAccepted = false;
  private invitationLoadPending = false;
  private isPreviewMode = false;
  private subscription?: Subscription;
  private invitationDataSubscription?: Subscription;
  private routeSubscription?: Subscription;

  constructor(
    private modalFlowService: ModalFlowService,
    private invitationService: InvitationService,
    private invitationStateService: InvitationStateService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadInvitationData();

    this.subscription = this.modalFlowService.welcomeModalAccepted$.subscribe(
      () => {
        this.welcomeAccepted = true;
        this.tryShowConfirmationGuide();
      },
    );

    this.invitationDataSubscription = this.invitationStateService
      .getInvitationData$()
      .subscribe((data) => {
        this.invitationLoadPending = false;

        const status = data?.data.invitation.status;
        if (!this.isPreviewMode && shouldShowExpiredInvitationPage(status)) {
          void this.router.navigate(['/expired'], {
            queryParamsHandling: 'preserve',
            replaceUrl: true,
          });
          return;
        }

        if (this.invitationStateService.isConfirmed()) {
          this.dismissConfirmationGuide();
          return;
        }

        if (this.welcomeAccepted) {
          this.tryShowConfirmationGuide();
        }
      });
  }

  private shouldShowConfirmationGuide(): boolean {
    if (localStorage.getItem(this.STORAGE_KEY)) {
      return false;
    }

    if (this.invitationStateService.isConfirmed()) {
      return false;
    }

    if (this.invitationLoadPending) {
      return false;
    }

    return true;
  }

  private tryShowConfirmationGuide(): void {
    if (this.shouldShowConfirmationGuide()) {
      this.showConfirmationGuide = true;
    }
  }

  private dismissConfirmationGuide(): void {
    this.showConfirmationGuide = false;
    localStorage.setItem(this.STORAGE_KEY, 'true');
  }

  private loadInvitationData(): void {
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      this.isPreviewMode = params['preview'] === '1';
      const invitation_token = params['token'];

      if (invitation_token) {
        this.invitationLoadPending = true;
        this.invitationStateService.setLoading(true);
        this.invitationStateService.setError(null);

        this.invitationService.getInvitationInfo(invitation_token).subscribe({
          next: (response) => {
            this.invitationStateService.setInvitationData(response);
            this.invitationStateService.setLoading(false);
          },
          error: (error) => {
            console.error('Error al cargar datos de invitación:', error);
            this.invitationStateService.setError(
              'Error al cargar los datos de la invitación',
            );
            this.invitationStateService.setLoading(false);
            this.invitationLoadPending = false;

            if (this.welcomeAccepted) {
              this.tryShowConfirmationGuide();
            }
          },
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.invitationDataSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }

  openConfirmation(): void {
    this.closeGuide();
    this.modalFlowService.requestOpenConfirmationModal();
  }

  closeGuide(): void {
    this.dismissConfirmationGuide();
  }
}
