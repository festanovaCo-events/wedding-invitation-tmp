/** Prefijo público en festanovaco.com (mismo dominio que el shell Next). */
export const INVITATION_PUBLIC_BASE = '/invitations-wedding-model-01';

/** Origen canónico del shell (no usar el subdominio del deploy Angular). */
export const SHELL_PUBLIC_ORIGIN = 'https://festanovaco.com';

/** URL pública absoluta de la invitación (con token opcional). */
export function buildInvitationPublicUrl(token?: string): string {
  if (!token) {
    return `${SHELL_PUBLIC_ORIGIN}${INVITATION_PUBLIC_BASE}`;
  }

  const params = new URLSearchParams({ token });
  return `${SHELL_PUBLIC_ORIGIN}${INVITATION_PUBLIC_BASE}?${params.toString()}`;
}
