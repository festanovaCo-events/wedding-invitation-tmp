/**
 * Interfaces para la respuesta del endpoint de información de invitación
 */

export type InvitationStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED';

export interface Guest {
  id: string;
  name: string;
}

export interface Invitation {
  id: string;
  name: string;
  status: InvitationStatus;
  seats_reserved: number;
  guests: Guest[];
  event_id?: string;
  token?: string;
  email?: string;
  responded_at?: string | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface InvitationInfoResponse {
  success: boolean;
  data: {
    invitation: Invitation;
    available_seats: number;
    used_seats: number;
    total_seats: number;
  };
}

export interface AcceptInvitationRequest {
  guest_names: string[];
}

export interface AcceptInvitationResponse {
  success: boolean;
  data: null;
}

export interface DeclineInvitationResponse {
  success: boolean;
  data: null;
}