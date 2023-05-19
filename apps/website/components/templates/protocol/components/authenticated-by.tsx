import useTranslation from 'next-translate/useTranslation';

import { brandColors } from 'apps/website/theme';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { limitCharsCentered } from '@gateway/helpers';

import { Stack } from '@mui/material';

import { ROUTES } from '../../../../constants/routes';
import { User } from '../../../../services/gateway-protocol/types';
import CardCell from './card-cell';

type Props = {
  authenticatedBy: PartialDeep<User>;
  hasLink: boolean;
};

export default function AuthenticatedBy({
  authenticatedBy,
  hasLink = false,
}: Props) {
  const { t } = useTranslation('protocol');

  const authenticatedByName =
    authenticatedBy?.gatewayId ?? authenticatedBy.primaryWallet.address;
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
          {limitCharsCentered(authenticatedByName, 20)}
        </Stack>
      ) : (
        <span>{limitCharsCentered(authenticatedByName, 20)}</span>
      )}
    </CardCell>
  );
}
