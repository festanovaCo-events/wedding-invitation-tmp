import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  AcceptInvitationResponse,
  DeclineInvitationResponse,
  Guest,
  InvitationInfoResponse
} from '../interfaces/invitation.interface';
import { INVITATION_MOCKS } from './invitation.mock';

@Injectable({ providedIn: 'root' })
export class InvitationMockApiService {
  private readonly store = new Map<string, InvitationInfoResponse>();

  reset(): void {
    this.store.clear();
  }

  getInfo(invitationToken: string): Observable<InvitationInfoResponse> {
    return of(this.clone(this.getOrCreate(invitationToken)));
  }

  accept(
    invitationToken: string,
    guestNames: string[]
  ): Observable<AcceptInvitationResponse> {
    const current = this.getOrCreate(invitationToken);
    const now = new Date().toISOString();
    const guests: Guest[] = guestNames.map((name, index) => ({
      id: `mock-guest-${index + 1}`,
      name
    }));
    const usedSeats = guestNames.length;

    this.store.set(invitationToken, {
      success: true,
      data: {
        ...current.data,
        invitation: {
          ...current.data.invitation,
          status: 'ACCEPTED',
          token: invitationToken,
          responded_at: now,
          updated_at: now,
          guests
        },
        used_seats: usedSeats,
        available_seats: current.data.total_seats - usedSeats
      }
    });

    return of(this.clone(INVITATION_MOCKS.accept));
  }

  decline(invitationToken: string): Observable<DeclineInvitationResponse> {
    const current = this.getOrCreate(invitationToken);
    const now = new Date().toISOString();

    this.store.set(invitationToken, {
      success: true,
      data: {
        ...current.data,
        invitation: {
          ...current.data.invitation,
          status: 'DECLINED',
          token: invitationToken,
          responded_at: now,
          updated_at: now,
          guests: []
        },
        used_seats: 0,
        available_seats: current.data.total_seats
      }
    });

    return of(this.clone(INVITATION_MOCKS.decline));
  }

  private getOrCreate(invitationToken: string): InvitationInfoResponse {
    const existing = this.store.get(invitationToken);
    if (existing) {
      return existing;
    }

    const initial = this.createInitialState(invitationToken);
    this.store.set(invitationToken, initial);
    return initial;
  }

  private createInitialState(invitationToken: string): InvitationInfoResponse {
    const template = this.clone(INVITATION_MOCKS.getInfo);

    return {
      success: true,
      data: {
        ...template.data,
        invitation: {
          ...template.data.invitation,
          token: invitationToken,
          status: 'PENDING',
          responded_at: null,
          // Mantener el titular en la lista de acompañantes del mock
          guests: template.data.invitation.guests?.length
            ? template.data.invitation.guests
            : [{ id: 'mock-guest-1', name: template.data.invitation.name }],
        },
        used_seats: Math.max(1, template.data.used_seats || 1),
        available_seats: template.data.total_seats,
        total_seats: template.data.total_seats,
      },
    };
  }

  private clone<T>(value: T): T {
    return structuredClone(value);
  }
}
