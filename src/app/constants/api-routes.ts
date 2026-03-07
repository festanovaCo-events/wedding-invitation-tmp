/**
 * Rutas del API - Endpoints centralizados
 */
export const API_ROUTES = {
  invitation: {
    /**
     * Obtener información de una invitación
     * GET /v1/invitation/info/:invitation_token
     */
    getInfo: (invitation_token: string) => `/v1/invitation/info/${invitation_token}`,
    /**
     * Aceptar invitación y registrar acompañantes
     * POST /v1/invitation/accept/:invitation_token
     */
    accept: (invitation_token: string) => `/v1/invitation/accept/${invitation_token}`,
    /**
     * Rechazar invitación
     * GET /v1/invitation/decline/:invitation_token
     */
    decline: (invitation_token: string) => `/v1/invitation/decline/${invitation_token}`,
  }
} as const;
