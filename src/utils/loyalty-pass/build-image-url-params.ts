import { Protocol_Api_Credential } from '@/services/hasura/types';
import { DateTime } from 'luxon';
import { PartialDeep } from 'type-fest';

export const getLoyaltyPassImageURLParams = (loyaltyPass: {
  daoName: string;
  title: string;
  gatewayId: string;
  tier: string;
  qrCode: string;
  image: string;
}): string => {
  try {
    return `?daoName=${loyaltyPass.daoName}&title=${
      loyaltyPass.title
    }&gatewayId=${loyaltyPass.gatewayId}&tier=${loyaltyPass.tier}&recipient=${
      loyaltyPass.gatewayId
    }${loyaltyPass.image ? '&image=' + loyaltyPass.image : ''}&qrCode=${
      loyaltyPass.qrCode
    }`;
  } catch (error) {
    return '';
  }
};
