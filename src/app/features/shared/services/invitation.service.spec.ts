import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { API_MOCK_FLAGS } from '../constants/api-mock-flags';
import { API_ROUTES } from '../constants/api-routes';
import { INVITATION_MOCKS } from '../mocks/invitation.mock';
import { InvitationMockApiService } from '../mocks/invitation-mock-api.service';
import { InvitationService } from './invitation.service';

describe('InvitationService', () => {
  let service: InvitationService;
  let httpMock: HttpTestingController;
  let invitationMockApi: InvitationMockApiService;
  let invitationFlags: Record<keyof typeof API_MOCK_FLAGS.invitation, boolean>;

  beforeEach(() => {
    invitationFlags = API_MOCK_FLAGS.invitation as unknown as Record<keyof typeof API_MOCK_FLAGS.invitation, boolean>;
    invitationFlags['getInfo'] = true;
    invitationFlags['accept'] = true;
    invitationFlags['decline'] = true;

    TestBed.configureTestingModule({
      providers: [
        InvitationService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(InvitationService);
    httpMock = TestBed.inject(HttpTestingController);
    invitationMockApi = TestBed.inject(InvitationMockApiService);
    invitationMockApi.reset();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devuelve el mock de información cuando el endpoint getInfo está mockeado', (done) => {
    service.getInvitationInfo('TOKEN_TEST').subscribe(response => {
      expect(response.data.invitation.status).toBe('PENDING');
      expect(response.data.invitation.token).toBe('TOKEN_TEST');
      done();
    });
  });

  it('actualiza el estado a ACCEPTED después de aceptar y recargar getInfo', (done) => {
    const token = 'TOKEN_TEST';
    const guestNames = ['Jorge Mestre', 'Invitado Demo'];

    service.acceptInvitation(token, guestNames).subscribe(() => {
      service.getInvitationInfo(token).subscribe(response => {
        expect(response.data.invitation.status).toBe('ACCEPTED');
        expect(response.data.invitation.guests).toEqual([
          { id: 'mock-guest-1', name: 'Jorge Mestre' },
          { id: 'mock-guest-2', name: 'Invitado Demo' }
        ]);
        expect(response.data.used_seats).toBe(2);
        expect(response.data.available_seats).toBe(0);
        done();
      });
    });
  });

  it('actualiza el estado a DECLINED después de rechazar y recargar getInfo', (done) => {
    const token = 'TOKEN_TEST';

    service.declineInvitation(token).subscribe(() => {
      service.getInvitationInfo(token).subscribe(response => {
        expect(response.data.invitation.status).toBe('DECLINED');
        expect(response.data.invitation.guests).toEqual([]);
        expect(response.data.used_seats).toBe(0);
        expect(response.data.available_seats).toBe(2);
        done();
      });
    });
  });

  it('consume el API real de información cuando el endpoint getInfo no está mockeado', () => {
    invitationFlags['getInfo'] = false;
    const token = 'TOKEN_TEST';

    service.getInvitationInfo(token).subscribe(response => {
      expect(response).toEqual(INVITATION_MOCKS.getInfo);
    });

    const request = httpMock.expectOne(`${environment.apiBaseUrl}${API_ROUTES.invitation.getInfo(token)}`);
    expect(request.request.method).toBe('GET');
    request.flush(INVITATION_MOCKS.getInfo);
  });

  it('devuelve el mock de aceptación cuando el endpoint accept está mockeado', (done) => {
    service.acceptInvitation('TOKEN_TEST', ['Jorge Mestre']).subscribe(response => {
      expect(response).toEqual(INVITATION_MOCKS.accept);
      done();
    });
  });

  it('consume el API real de aceptación cuando el endpoint accept no está mockeado', () => {
    invitationFlags['accept'] = false;
    const token = 'TOKEN_TEST';
    const guestNames = ['Jorge Mestre', 'Invitado'];

    service.acceptInvitation(token, guestNames).subscribe(response => {
      expect(response).toEqual(INVITATION_MOCKS.accept);
    });

    const request = httpMock.expectOne(`${environment.apiBaseUrl}${API_ROUTES.invitation.accept(token)}`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ guest_names: guestNames });
    request.flush(INVITATION_MOCKS.accept);
  });

  it('devuelve el mock de rechazo cuando el endpoint decline está mockeado', (done) => {
    service.declineInvitation('TOKEN_TEST').subscribe(response => {
      expect(response).toEqual(INVITATION_MOCKS.decline);
      done();
    });
  });

  it('consume el API real de rechazo cuando el endpoint decline no está mockeado', () => {
    invitationFlags['decline'] = false;
    const token = 'TOKEN_TEST';

    service.declineInvitation(token).subscribe(response => {
      expect(response).toEqual(INVITATION_MOCKS.decline);
    });

    const request = httpMock.expectOne(`${environment.apiBaseUrl}${API_ROUTES.invitation.decline(token)}`);
    expect(request.request.method).toBe('GET');
    request.flush(INVITATION_MOCKS.decline);
  });
});
