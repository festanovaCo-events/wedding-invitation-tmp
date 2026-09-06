import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MODEL_02_INFO } from '../../constants/model-02-info';
import { M02HeroComponent } from '../../components/hero/m02-hero.component';
import { M02InvitationComponent } from '../../components/invitation/m02-invitation.component';
import { M02EventsComponent } from '../../components/events/m02-events.component';
import { M02TimelineComponent } from '../../components/timeline/m02-timeline.component';
import { M02PassesComponent } from '../../components/passes/m02-passes.component';
import { M02GiftsComponent } from '../../components/gifts/m02-gifts.component';
import { M02RsvpComponent } from '../../components/rsvp/m02-rsvp.component';
import { M02AdultsOnlyComponent } from '../../components/adults-only/m02-adults-only.component';
import { M02FooterComponent } from '../../components/footer/m02-footer.component';
import { ModalComponent } from '../../../shared/components/common/modal/modal.component';
import { ModalFlowService } from '../../../shared/services/modal-flow.service';
import { InvitationService } from '../../../shared/services/invitation.service';
import { InvitationStateService } from '../../../shared/services/invitation-state.service';
import { shouldShowExpiredInvitationPage } from '../../../shared/utils/confirmation-deadline';

@Component({
  selector: 'app-model-02-page',
  standalone: true,
  imports: [
    CommonModule,
    M02HeroComponent,
    M02InvitationComponent,
    M02EventsComponent,
    M02TimelineComponent,
    M02PassesComponent,
    M02GiftsComponent,
    M02RsvpComponent,
    M02AdultsOnlyComponent,
    M02FooterComponent,
    ModalComponent,
  ],
  templateUrl: './model-02-page.component.html',
})
export class Model02PageComponent implements OnInit, OnDestroy {
  readonly assets = MODEL_02_INFO.assets;

  showConfirmationGuide = false;

  private readonly storageKey = 'confirmation_guide_shown';
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

        const isDeclined = status === 'DECLINED';
        if (this.invitationStateService.isConfirmed() || isDeclined) {
          this.dismissConfirmationGuide();
          return;
        }

        if (this.welcomeAccepted) {
          this.tryShowConfirmationGuide();
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

  private shouldShowConfirmationGuide(): boolean {
    if (localStorage.getItem(this.storageKey)) {
      return false;
    }

    if (this.invitationStateService.isConfirmed()) {
      return false;
    }

    const status =
      this.invitationStateService.getInvitationData()?.data.invitation.status;
    if (status === 'DECLINED') {
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
    localStorage.setItem(this.storageKey, 'true');
  }

  private loadInvitationData(): void {
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      this.isPreviewMode = params['preview'] === '1';
      const invitationToken = params['token'];

      if (invitationToken) {
        this.invitationLoadPending = true;
        this.invitationStateService.setLoading(true);
        this.invitationStateService.setError(null);

        this.invitationService.getInvitationInfo(invitationToken).subscribe({
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
}
