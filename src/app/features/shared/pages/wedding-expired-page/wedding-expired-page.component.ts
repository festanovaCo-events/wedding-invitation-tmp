import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { M01ExpiredBannerComponent } from '../../../model-01/components/expired-banner/m01-expired-banner.component';
import { M01InvitationCardComponent } from '../../../model-01/components/invitation-card/m01-invitation-card.component';
import { WEDDING_INFO } from '../../constants/wedding-info';
import { InvitationService } from '../../services/invitation.service';
import { InvitationStateService } from '../../services/invitation-state.service';
import { shouldShowExpiredInvitationPage } from '../../utils/confirmation-deadline';

@Component({
  selector: 'app-wedding-expired-page',
  standalone: true,
  imports: [CommonModule, M01ExpiredBannerComponent, M01InvitationCardComponent],
  templateUrl: './wedding-expired-page.component.html',
  styleUrl: './wedding-expired-page.component.css',
})
export class WeddingExpiredPageComponent implements OnInit, OnDestroy {
  weddingInfo = WEDDING_INFO;
  inviteeName = 'Invitado';
  invitationUrl = '';
  private routeSubscription?: Subscription;
  private invitationSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invitationService: InvitationService,
    private invitationStateService: InvitationStateService
  ) {}

  get coupleName(): string {
    return this.weddingInfo.couple.fullName;
  }

  get deadline(): string {
    return this.weddingInfo.confirmation.deadlineLabel;
  }

  ngOnInit(): void {
    this.invitationSubscription = this.invitationStateService
      .getInvitationData$()
      .subscribe((data) => {
        const invitation = data?.data.invitation;
        if (invitation?.name) {
          this.inviteeName = invitation.name.split(' ')[0];
        }

        if (invitation && !shouldShowExpiredInvitationPage(invitation.status)) {
          void this.router.navigate(['/'], {
            queryParamsHandling: 'preserve',
            replaceUrl: true,
          });
        }
      });

    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      const token = params['token'] as string | undefined;

      if (token) {
        this.invitationUrl = `${window.location.origin}/invitations-wedding?token=${encodeURIComponent(token)}`;
        this.loadInvitation(token);
        return;
      }

      const existing = this.invitationStateService.getInvitationData();
      const existingToken = existing?.data.invitation.token;
      if (existingToken) {
        this.invitationUrl = `${window.location.origin}/invitations-wedding?token=${encodeURIComponent(existingToken)}`;
        if (existing?.data.invitation.name) {
          this.inviteeName = existing.data.invitation.name.split(' ')[0];
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.invitationSubscription?.unsubscribe();
  }

  private loadInvitation(token: string): void {
    const existing = this.invitationStateService.getInvitationData();
    if (existing?.data.invitation.token === token) {
      return;
    }

    this.invitationStateService.setLoading(true);
    this.invitationService.getInvitationInfo(token).subscribe({
      next: (response) => {
        this.invitationStateService.setInvitationData(response);
        this.invitationStateService.setLoading(false);
      },
      error: () => {
        this.invitationStateService.setError('Error al cargar los datos de la invitación');
        this.invitationStateService.setLoading(false);
      },
    });
  }
}
