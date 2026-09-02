import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BannerHomeComponent } from '../../components/banner-home/banner-home.component';
import { WeddingCountdownComponent } from '../../components/wedding-countdown/wedding-countdown.component';
import { EventScheduleComponent } from '../../components/event-schedule/event-schedule.component';
import { PortraitsWrapperComponent } from '../../components/portraits/portraits-wrapper.component';
import { InstructionsComponent } from '../../components/instructions/instructions.component';
import { GiftsComponent } from '../../components/gifts/gifts.component';
import { BannerInstagramComponent } from '../../components/banner-instagram/banner-instagram.component';
import { ConfirmationsComponent } from '../../components/confirmations/confirmations.component';
import { ModalComponent } from '../../../shared/components/common/modal/modal.component';
import { ModalFlowService } from '../../../shared/services/modal-flow.service';
import { InvitationService } from '../../../shared/services/invitation.service';
import { InvitationStateService } from '../../../shared/services/invitation-state.service';
import { shouldShowExpiredInvitationPage } from '../../../shared/utils/confirmation-deadline';

@Component({
  selector: 'app-wedding-page',
  standalone: true,
  imports: [
    CommonModule,
    BannerHomeComponent,
    WeddingCountdownComponent,
    EventScheduleComponent,
    PortraitsWrapperComponent,
    InstructionsComponent,
    GiftsComponent,
    BannerInstagramComponent,
    ConfirmationsComponent,
    ModalComponent,
  ],
  templateUrl: './wedding-page.component.html',
})
export class WeddingPageComponent implements OnInit, OnDestroy {
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
