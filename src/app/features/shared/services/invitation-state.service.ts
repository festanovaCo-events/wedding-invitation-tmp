import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InvitationInfoResponse } from '../interfaces/invitation.interface';

@Injectable({ providedIn: 'root' })
export class InvitationStateService {
  private invitationData$ = new BehaviorSubject<InvitationInfoResponse | null>(null);
  private loading$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<string | null>(null);

  /**
   * Observable para obtener los datos de la invitación
   */
  getInvitationData$(): Observable<InvitationInfoResponse | null> {
    return this.invitationData$.asObservable();
  }

  /**
   * Observable para obtener el estado de carga
   */
  getLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  /**
   * Observable para obtener errores
   */
  getError$(): Observable<string | null> {
    return this.error$.asObservable();
  }

  /**
   * Obtener el valor actual de los datos de invitación
   */
  getInvitationData(): InvitationInfoResponse | null {
    return this.invitationData$.value;
  }

  /**
   * Establecer los datos de la invitación
   */
  setInvitationData(data: InvitationInfoResponse | null): void {
    this.invitationData$.next(data);
  }

  /**
   * Establecer el estado de carga
   */
  setLoading(loading: boolean): void {
    this.loading$.next(loading);
  }

  /**
   * Establecer un error
   */
  setError(error: string | null): void {
    this.error$.next(error);
  }

  /**
   * Obtener el valor actual del error
   */
  getError(): string | null {
    return this.error$.value;
  }

  /**
   * Verificar si la invitación ya está confirmada
   */
  isConfirmed(): boolean {
    const data = this.invitationData$.value;
    return data?.data.invitation.status === 'ACCEPTED';
  }

  /**
   * Obtener el eventId de la invitación actual
   */
  getEventId(): string | null {
    const data = this.invitationData$.value;
    return data?.data.invitation.event_id || null;
  }

  /**
   * Obtener el token de la invitación actual
   */
  getToken(): string | null {
    const data = this.invitationData$.value;
    return data?.data.invitation.token || null;
  }
}
