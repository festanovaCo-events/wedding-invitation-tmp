import { WEDDING_INFO } from '../constants/wedding-info';
import { InvitationStatus } from '../interfaces/invitation.interface';

export function isConfirmationDeadlinePassed(
  referenceDate: Date = new Date(),
): boolean {
  return (
    referenceDate.getTime() >
    new Date(WEDDING_INFO.confirmation.deadline).getTime()
  );
}

export function shouldShowExpiredInvitationPage(
  status: InvitationStatus | undefined,
): boolean {
  return (
    (status === 'DECLINED' && isConfirmationDeadlinePassed()) ||
    (status === 'PENDING' && isConfirmationDeadlinePassed())
  );
}
