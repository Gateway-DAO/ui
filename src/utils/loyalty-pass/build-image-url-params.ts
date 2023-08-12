import { Loyalty_Program } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

export const getLoyaltyPassImageURLParams = (
  loyaltyPass: PartialDeep<Loyalty_Program>,
  gatewayId: string,
  actualTier: string,
  qrCode: string
): string => {
  try {
    return `?daoName=${loyaltyPass.dao.name}&title=${
      loyaltyPass.name
    }&gatewayId=${gatewayId.split(' ')[0]}&tier=${actualTier}${
      loyaltyPass.image ? '&image=' + loyaltyPass.image : ''
    }${
      loyaltyPass.dao.logo.s3_key
        ? '&daoLogo=' + loyaltyPass.dao.logo.s3_key
        : ''
    }`;
  } catch (error) {
    return '';
  }
};
