import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BannerHomeComponent } from "../../../components/wedding-components/banner-home/banner-home.component";
import { WeddingCountdownComponent } from "../../../components/wedding-components/wedding-countdown/wedding-countdown.component";
import { EventScheduleComponent } from "../../../components/wedding-components/event-schedule/event-schedule.component";
import { PortraitsWrapperComponent } from "../../../components/wedding-components/portraits/portraits-wrapper.component";
import { InstructionsComponent } from "../../../components/wedding-components/instructions/instructions.component";
import { GiftsComponent } from "../../../components/wedding-components/gifts/gifts.component";
import { BannerInstagramComponent } from "../../../components/wedding-components/banner-instagram/banner-instagram.component";
import { ConfirmationsComponent } from "../../../components/wedding-components/confirmations/confirmations.component";
import { ModalComponent } from "../../../components/common/modal/modal.component";
import { ModalFlowService } from "../../../services/modal-flow.service";
import { InvitationService } from "../../../services/invitation.service";
import { InvitationStateService } from "../../../services/invitation-state.service";

@Component({
  selector: 'app-wedding-page',
  standalone: true,
  imports: [CommonModule, BannerHomeComponent, WeddingCountdownComponent, EventScheduleComponent, PortraitsWrapperComponent, InstructionsComponent, GiftsComponent, BannerInstagramComponent, ConfirmationsComponent, ModalComponent],
  templateUrl: './wedding-page.component.html',
})
export class WeddingPageComponent implements OnInit, OnDestroy {
  showConfirmationGuide = false;
  private readonly STORAGE_KEY = 'confirmation_guide_shown';
  private welcomeAccepted = false;
  private invitationLoadPending = false;
  private subscription?: Subscription;
  private invitationDataSubscription?: Subscription;
  private routeSubscription?: Subscription;

  constructor(
    private modalFlowService: ModalFlowService,
    private invitationService: InvitationService,
    private invitationStateService: InvitationStateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadInvitationData();

    this.subscription = this.modalFlowService.welcomeModalAccepted$.subscribe(() => {
      this.welcomeAccepted = true;
      this.tryShowConfirmationGuide();
    });

    this.invitationDataSubscription = this.invitationStateService.getInvitationData$().subscribe(() => {
      this.invitationLoadPending = false;

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
    this.routeSubscription = this.route.queryParams.subscribe(params => {
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
            this.invitationStateService.setError('Error al cargar los datos de la invitación');
            this.invitationStateService.setLoading(false);
            this.invitationLoadPending = false;

            if (this.welcomeAccepted) {
              this.tryShowConfirmationGuide();
            }
          }
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
