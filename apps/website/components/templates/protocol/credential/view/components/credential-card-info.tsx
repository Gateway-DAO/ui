import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest';

import { timestampToString } from '@gateway/helpers';
import { theme } from '@gateway/theme';

import { Stack, Paper, Box, Divider, Chip, useMediaQuery } from '@mui/material';

import { Credential } from '../../../../../../services/gateway-protocol/types';
import CardCell from '../../../components/card-cell';
import CardUsers from './card-users';

type Props = {
  credential: PartialDeep<Credential>;
};

export default function CredentialCardInfo({ credential }: Props) {
  const { t, lang } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const isDateExpired = (() => {
    if (!credential?.expirationDate) {
      return false;
    }
    const expireDate = new Date(credential?.expirationDate);
    expireDate.setDate(expireDate.getDate());
    return expireDate.getTime() < new Date().getTime();
  })();

  return (
    <Paper
      elevation={2}
      component={Stack}
      sx={{
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        mb: 3,
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <CardUsers
        issuer={credential?.issuer}
        recipient={credential?.recipient}
      />
      <Stack
        alignItems="stretch"
        justifyContent="space-around"
        sx={{
          flexDirection: isMobile ? 'column' : 'row',
        }}
        divider={
          <Box>
            <Divider orientation={isMobile ? 'horizontal' : 'vertical'} />
          </Box>
        }
      >
        <CardCell label={t('credential.issuance-date')}>
          {timestampToString(
            credential?.issuanceDate,
            lang,
            t('credential.indeterminate')
          )}
        </CardCell>
        <CardCell label={t('credential.expiration-date')}>
          {timestampToString(
            credential?.expirationDate,
            lang,
            t('credential.indeterminate')
          )}
        </CardCell>
        <CardCell label={t('credential.status')}>
          {!isDateExpired && (
            <Chip
              label={t('credential.valid')}
              size="small"
              variant="outlined"
              color="success"
            />
          )}
          {isDateExpired && (
            <Chip
              label={t('credential.expired')}
              size="small"
              variant="outlined"
              color="warning"
            />
          )}
          {/* {credential?.status === 'REVOKED' && (
            <Chip
              label={t('credential.revoked')}
              size="small"
              variant="outlined"
              color="warning"
            />
          )}
          {credential?.status === 'INVALID' && (
            <Chip
              label={t('credential.invalid')}
              size="small"
              variant="outlined"
              color="error"
            />
          )} */}
        </CardCell>
      </Stack>
    </Paper>
  );
}
