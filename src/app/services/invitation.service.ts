import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_MOCK_FLAGS } from '../constants/api-mock-flags';
import { API_ROUTES } from '../constants/api-routes';
import { INVITATION_MOCKS } from '../mocks/invitation.mock';
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
    if (API_MOCK_FLAGS.invitation.getInfo) {
      return of(INVITATION_MOCKS.getInfo);
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
    if (API_MOCK_FLAGS.invitation.accept) {
      return of(INVITATION_MOCKS.accept);
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
    if (API_MOCK_FLAGS.invitation.decline) {
      return of(INVITATION_MOCKS.decline);
    }

    const url = `${environment.apiBaseUrl}${API_ROUTES.invitation.decline(invitation_token)}`;

    return this.http.get<DeclineInvitationResponse>(url);
  }
}
