import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { TicketsIcon } from '@hugeicons/core-free-icons';
import { MODEL_02_INFO } from '../../constants/model-02-info';
import { InvitationStateService } from '../../../shared/services/invitation-state.service';

@Component({
  selector: 'app-m02-passes',
  standalone: true,
  imports: [CommonModule, HugeiconsIconComponent],
  templateUrl: './m02-passes.component.html',
})
export class M02PassesComponent implements OnInit, OnDestroy {
  readonly info = MODEL_02_INFO;
  readonly icon = TicketsIcon;
  reservedPasses = 2;

  private subscription?: Subscription;

  constructor(private invitationStateService: InvitationStateService) {}

  ngOnInit(): void {
    this.subscription = this.invitationStateService.getInvitationData$().subscribe((data) => {
      const passes = data?.data.invitation.seats_reserved;
      if (passes != null) {
        this.reservedPasses = passes;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
