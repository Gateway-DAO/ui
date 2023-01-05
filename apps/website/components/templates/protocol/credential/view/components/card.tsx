import useTranslation from 'next-translate/useTranslation';

import { theme } from '@gateway/theme';

import { Stack, Paper, Box, Divider, Chip, useMediaQuery } from '@mui/material';

import { MockCredential, MockEntity } from '../credential-view';
import CardCell from './card-cell';
import CardUsers from './card-users';

type Props = {
  issuer: MockEntity;
  recipient: MockEntity;
  credential: MockCredential;
};

export default function Card({ issuer, recipient, credential }: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Paper
      elevation={2}
      component={Stack}
      sx={{
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        mb: 1,
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <CardUsers issuer={issuer} recipient={recipient} />
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
          {credential?.issuanceDate}
        </CardCell>
        <CardCell label={t('credential.expiration-date')}>
          {credential?.expirationDate}
        </CardCell>
        <CardCell label={t('credential.status')}>
          {credential?.status === 0 && (
            <Chip
              label={t('credential.valid')}
              size="small"
              variant="outlined"
              color="success"
            />
          )}
          {credential?.status === 1 && (
            <Chip
              label={t('credential.expired')}
              size="small"
              variant="outlined"
              color="warning"
            />
          )}
          {credential?.status === 2 && (
            <Chip
              label={t('credential.revoked')}
              size="small"
              variant="outlined"
              color="warning"
            />
          )}
          {credential?.status === 3 && (
            <Chip
              label={t('credential.invalid')}
              size="small"
              variant="outlined"
              color="error"
            />
          )}
        </CardCell>
      </Stack>
    </Paper>
  );
}
