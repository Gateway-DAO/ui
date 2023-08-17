import { generateImageUrl } from '@/hooks/use-file';
import { Loyalty_Program } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

export const getLoyaltyPassImageURLParams = (
  loyaltyPass: PartialDeep<Loyalty_Program>,
  gatewayId: string,
  actualTier = 'No tier'
): string => {
  try {
    return `?daoName=${loyaltyPass.dao.name}&daoImage=${generateImageUrl(
      loyaltyPass.dao.logo.s3_key
    )}&title=${loyaltyPass.name}&gatewayId=${
      gatewayId.split(' ')[0]
    }&tier=${actualTier}${
      loyaltyPass.image ? '&image=' + loyaltyPass.image : ''
    }`;
  } catch (error) {
    return '';
  }
};
