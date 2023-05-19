import useTranslation from 'next-translate/useTranslation';

import { useQuery } from '@tanstack/react-query';
import { theme } from 'apps/website/theme';
import { limitCharsCentered } from 'apps/website/utils/string';
import { PartialDeep } from 'type-fest';

import { Stack, Box, useMediaQuery } from '@mui/material';

import { ROUTES } from '../../../../constants/routes';
import {
  Organization,
  User,
} from '../../../../services/gateway-protocol/types';
import { gqlAnonMethods } from '../../../../services/hasura/api';
import Loading from '../../../atoms/loading';
import CardUserCell from './card-user-cell';

type Props = {
  issuer: PartialDeep<User>;
  organization?: PartialDeep<Organization>;
  recipient: PartialDeep<User>;
};

export default function CardUsers({
  issuer: issuerCredential,
  organization: issuerOrganization,
  recipient: recipientCredential,
}: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const issuer = useQuery(
    ['issuer', issuerCredential?.id],
    () =>
      gqlAnonMethods.user_from_wallet({
        wallet: issuerCredential?.primaryWallet?.address,
      }),
    {
      select: (data) => data.users?.[0],
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const organization = useQuery(
    ['organization', issuerOrganization?.id],
    () =>
      gqlAnonMethods.dao_profile_by_slug({
        slug: issuerOrganization?.gatewayId,
      }),
    {
      select: (data) => data.daos?.[0],
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const recipient = useQuery(
    ['recipient', recipientCredential.gatewayId],
    () =>
      gqlAnonMethods.user_from_wallet({
        wallet: recipientCredential.primaryWallet?.address,
      }),
    {
      select: (data) => data.users?.[0],
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const issuerName =
    organization?.data?.name ??
    issuerOrganization?.gatewayId ??
    issuer?.data?.username ??
    issuerCredential?.gatewayId ??
    issuerCredential.primaryWallet.address;

  const recipientName =
    recipient?.data?.username ??
    recipientCredential?.gatewayId ??
    recipientCredential.primaryWallet.address;

  const showPicture = () => {
    if (issuerOrganization && organization?.data)
      return organization?.data?.logo;
    if (issuerOrganization) return;
    if (issuer?.data) return issuer?.data?.picture;

    return;
  };

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'baseline', md: 'stretch' },
      }}
    >
      {issuer.isLoading ? (
        <Loading margin={1} />
      ) : (
        <CardUserCell
          label={t('credential.issuer-id')}
          picture={showPicture()}
          fallback={organization?.data?.logo_url}
          name={limitCharsCentered(issuerName, 20)}
          href={
            organization?.data?.slug
              ? ROUTES.DAO_PROFILE.replace('[slug]', organization?.data?.slug)
              : ROUTES.PROFILE.replace('[username]', issuer?.data?.username)
          }
          hasLink={!!organization.data || !!issuer.data}
          id="credential-textlink-issuerid"
        />
      )}
      <Box
        sx={{
          alignSelf: { md: 'center' },
          py: { xs: 0, md: 2 },
          px: { xs: 3, md: 2 },
          transform: { xs: 'rotate(90deg)', md: 'none' },
        }}
      >
        <svg width="18" height="36" fill="none" viewBox="0 0 18 36">
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity=".7"
            d="m.5 1 17 17-17 17"
          />
        </svg>
      </Box>
      {recipient.isLoading ? (
        <Loading margin={1} />
      ) : (
        <CardUserCell
          label={t('credential.recipient-id')}
          picture={recipient?.data?.picture}
          name={limitCharsCentered(recipientName, 20)}
          href={ROUTES.PROFILE.replace('[username]', recipientName)}
          alignRight={!isMobile}
          hasLink={!!recipient.data}
          id="credential-textlink-recipientid"
        />
      )}
    </Stack>
  );
}
