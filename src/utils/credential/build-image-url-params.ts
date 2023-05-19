import { Credential } from '@/services/gateway-protocol/types';
import { DateTime } from 'luxon';
import { PartialDeep } from 'type-fest';

export const getCredentialImageURLParams = (
  credential: PartialDeep<Credential>
): string => {
  try {
    const issuanceDate = DateTime.fromISO(credential.createdAt).toFormat(
      'MMM dd, yyyy a'
    );
    return `?id=${credential.id}&title=${
      credential.title
    }&description=${credential.description.slice(0, 100)}&issuer=${
      credential.issuerUser?.gatewayId
    }&recipient=${
      credential.recipientUser?.gatewayId
    }&issuanceDate=${issuanceDate}${
      credential.image ? '&image=' + credential.image : ''
    }&qrCode=${credential.qrCode}`;
  } catch (error) {
    return '';
  }
};
