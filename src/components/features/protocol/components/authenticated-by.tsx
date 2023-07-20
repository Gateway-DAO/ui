import useTranslation from 'next-translate/useTranslation';

import { ROUTES } from '@/constants/routes';
import { Protocol_Api_Auth, Protocol_Api_User } from '@/services/hasura/types';
import { brandColors } from '@/theme';
import { limitCharsCentered } from '@/utils/string';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack } from '@mui/material';

import CardCell from './card-cell';

type Props = {
  authenticatedBy: PartialDeep<Protocol_Api_User>;
  authenticatedAuthData?: PartialDeep<Protocol_Api_Auth>;
  hasLink: boolean;
};

export default function AuthenticatedBy({
  authenticatedBy,
  authenticatedAuthData,
  hasLink = false,
}: Props) {
  const { t } = useTranslation('protocol');

  const authenticatedByName = authenticatedBy?.gatewayId;

  return (
    <CardCell label={t('credential.authenticated-by')}>
      {hasLink ? (
        <Stack
          component="a"
          target="_blank"
          id="credential-textlink-signerid"
          title={authenticatedByName}
          sx={{
            color: brandColors.purple.main,
            textDecoration: 'none',
            cursor: 'pointer',
            fontSize: 14,
          }}
          href={ROUTES.PROFILE.replace('[username]', authenticatedByName)}
        >
          {limitCharsCentered(authenticatedByName, 20) ||
            limitCharsCentered(authenticatedAuthData?.id, 8)}
        </Stack>
      ) : (
        <span>
          {limitCharsCentered(authenticatedByName, 20) ||
            limitCharsCentered(authenticatedAuthData?.id, 8)}
        </span>
      )}
    </CardCell>
  );
}
