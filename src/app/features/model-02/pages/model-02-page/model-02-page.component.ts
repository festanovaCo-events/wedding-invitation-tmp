import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import {
  CheckmarkCircle02Icon,
  ChurchIcon,
  DrinkIcon,
  FireworksIcon,
  GiftIcon,
  Mail01Icon,
  MusicNote01Icon,
  SpoonAndForkIcon,
  TicketsIcon,
  Time04Icon,
} from '@hugeicons/core-free-icons';
import { WEDDING_INFO } from '../../../shared/constants/wedding-info';
import { MODEL_02_INFO } from '../../constants/model-02-info';
import { ModalComponent } from '../../../shared/components/common/modal/modal.component';
import { ConfirmationModalHostComponent } from '../../../shared/components/confirmations/confirmation-modal-host.component';
import { ConfirmationStatusComponent } from '../../../model-01/components/confirmations/confirmation-status/confirmation-status.component';
import { DeclinedStatusComponent } from '../../../model-01/components/confirmations/declined-status/declined-status.component';
import { ErrorStatusComponent } from '../../../model-01/components/confirmations/error-status/error-status.component';
import { ModalFlowService } from '../../../shared/services/modal-flow.service';
import { InvitationService } from '../../../shared/services/invitation.service';
import { InvitationStateService } from '../../../shared/services/invitation-state.service';
import { InvitationInfoResponse } from '../../../shared/interfaces/invitation.interface';
import { shouldShowExpiredInvitationPage } from '../../../shared/utils/confirmation-deadline';

@Component({
  selector: 'app-model-02-page',
  standalone: true,
  imports: [
    CommonModule,
    HugeiconsIconComponent,
    ModalComponent,
    ConfirmationModalHostComponent,
    ConfirmationStatusComponent,
    DeclinedStatusComponent,
    ErrorStatusComponent,
  ],
  templateUrl: './model-02-page.component.html',
})
export class Model02PageComponent implements OnInit, OnDestroy {
  readonly weddingInfo = WEDDING_INFO;
  readonly info = MODEL_02_INFO;
  readonly assets = {
    eucalyptus: 'assets/images/model-02/eucalyptus.png',
    eucalyptusInvite: 'assets/images/model-02/eucalyptus-invite.png',
  };

  readonly icons = {
    passes: TicketsIcon,
    gift: GiftIcon,
    envelope: Mail01Icon,
    rsvp: CheckmarkCircle02Icon,
  };

  readonly timelineIcons = {
    church: ChurchIcon,
    cocktail: DrinkIcon,
    fireworks: FireworksIcon,
    dinner: SpoonAndForkIcon,
    party: MusicNote01Icon,
    clock: Time04Icon,
  } as const;

  showConfirmationGuide = false;
  isConfirmationModalVisible = false;
  reservedPasses = 2;
  invitationData: InvitationInfoResponse | null = null;
  isConfirmed = false;
  isDeclined = false;
  error: string | null = null;

  private readonly storageKey = 'confirmation_guide_shown';
  private welcomeAccepted = false;
  private invitationLoadPending = false;
  private isPreviewMode = false;
  private subscription?: Subscription;
  private invitationDataSubscription?: Subscription;
  private errorSubscription?: Subscription;
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
    this.error = this.invitationStateService.getError();

    this.subscription = this.modalFlowService.welcomeModalAccepted$.subscribe(() => {
      this.welcomeAccepted = true;
      this.tryShowConfirmationGuide();
    });

    this.errorSubscription = this.invitationStateService.getError$().subscribe((error) => {
      this.error = error;
      if (error) {
        this.isConfirmationModalVisible = false;
        this.dismissConfirmationGuide();
      }
    });

    this.invitationDataSubscription = this.invitationStateService
      .getInvitationData$()
      .subscribe((data) => {
        this.invitationLoadPending = false;
        this.invitationData = data;
        this.isConfirmed = data?.data.invitation.status === 'ACCEPTED';
        this.isDeclined = data?.data.invitation.status === 'DECLINED';

        const passes = data?.data.invitation.seats_reserved;
        if (passes != null) {
          this.reservedPasses = passes;
        }

        const status = data?.data.invitation.status;
        if (!this.isPreviewMode && shouldShowExpiredInvitationPage(status)) {
          void this.router.navigate(['/expired'], {
            queryParamsHandling: 'preserve',
            replaceUrl: true,
          });
          return;
        }

        if (this.isConfirmed || this.isDeclined) {
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
    this.errorSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }

  get canConfirm(): boolean {
    return !this.isConfirmed && !this.isDeclined && !this.error;
  }

  openLocation(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  openConfirmation(): void {
    if (!this.canConfirm) {
      return;
    }
    this.closeGuide();
    this.isConfirmationModalVisible = true;
  }

  closeGuide(): void {
    this.dismissConfirmationGuide();
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalVisible = false;
  }

  private shouldShowConfirmationGuide(): boolean {
    if (localStorage.getItem(this.storageKey)) {
      return false;
    }
    if (this.isConfirmed || this.isDeclined || this.error) {
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
            this.invitationStateService.setError('Error al cargar los datos de la invitación');
            this.invitationStateService.setLoading(false);
            this.invitationLoadPending = false;
          },
        });
      }
    });
  }
}
