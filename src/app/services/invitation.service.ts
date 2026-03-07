import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { FEATURE_FLAGS } from '../constants/feature-flags';
import { API_ROUTES } from '../constants/api-routes';
import { 
  InvitationInfoResponse, 
  AcceptInvitationRequest, 
  AcceptInvitationResponse, 
  DeclineInvitationResponse 
} from '../interfaces/invitation.interface';

@Injectable({ providedIn: 'root' })
export class InvitationService {
  constructor(private http: HttpClient) {}

  /**
   * Obtener información de una invitación usando el token único
   * @param invitation_token Token único de la invitación (va en la ruta)
   * @returns Observable con la información de la invitación
   */
  getInvitationInfo(invitation_token: string): Observable<InvitationInfoResponse> {
    if (FEATURE_FLAGS.USE_MOCK_INVITATION_DATA) {
      return of(this.getMockInvitationInfo());
    }

    const url = `${environment.apiBaseUrl}${API_ROUTES.invitation.getInfo(invitation_token)}`;

    return this.http.get<InvitationInfoResponse>(url);
  }

  /**
   * Aceptar invitación y registrar acompañantes
   * @param invitation_token Token único de la invitación
   * @param guestNames Lista de nombres de los acompañantes
   * @returns Observable con la respuesta de aceptación
   */
  acceptInvitation(
    invitation_token: string, 
    guestNames: string[]
  ): Observable<AcceptInvitationResponse> {
    if (FEATURE_FLAGS.USE_MOCK_INVITATION_DATA) {
      return of({ success: true, data: null });
    }

    const url = `${environment.apiBaseUrl}${API_ROUTES.invitation.accept(invitation_token)}`;
    const body: AcceptInvitationRequest = {
      guest_names: guestNames
    };

    return this.http.post<AcceptInvitationResponse>(url, body);
  }

  /**
   * Rechazar invitación
   * @param invitation_token Token único de la invitación
   * @returns Observable con la respuesta de rechazo
   */
  declineInvitation(
    invitation_token: string
  ): Observable<DeclineInvitationResponse> {
    if (FEATURE_FLAGS.USE_MOCK_INVITATION_DATA) {
      return of({ success: true, data: null });
    }

    const url = `${environment.apiBaseUrl}${API_ROUTES.invitation.decline(invitation_token)}`;

    return this.http.get<DeclineInvitationResponse>(url);
  }

  /**
   * Datos mockeados para desarrollo y testing
   */
  private getMockInvitationInfo(): InvitationInfoResponse {
    return {
      success: true,
      data: {
        available_seats: 5,
        invitation: {
          id: '4d681517-23f2-4b84-83f7-5db2f56d90ea',
          event_id: 'b20f90b2-9423-44c1-b1a0-7bc971b84824',
          email: 'jmestrelozano@gmail.com',
          name: 'Jorge Mestre',
          seats_reserved: 5,
          status: 'PENDING',
          token: 'ZKQJHWOCKIKWAG522N2ZLED4RM',
          responded_at: null,
          created_at: '2026-03-03T15:44:53.253052Z',
          updated_at: '2026-03-03T15:44:53.253052Z',
          deleted_at: '0001-01-01T00:00:00Z',
          guests: []
        },
        total_seats: 5,
        used_seats: 0
      }
    };
  }
}
