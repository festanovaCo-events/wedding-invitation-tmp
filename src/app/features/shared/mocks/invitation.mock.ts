import {
  AcceptInvitationResponse,
  DeclineInvitationResponse,
  InvitationInfoResponse
} from '../interfaces/invitation.interface';

export const INVITATION_MOCKS: {
  getInfo: InvitationInfoResponse;
  accept: AcceptInvitationResponse;
  decline: DeclineInvitationResponse;
} = {
  getInfo: {
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
  },
  accept: {
    success: true,
    data: null
  },
  decline: {
    success: true,
    data: null
  }
};
