import useTranslation from 'next-translate/useTranslation';

import { theme } from '@gateway/theme';

import { Stack, Box, useMediaQuery } from '@mui/material';

import { MockEntity } from '../credential-view';
import CardUserCell from './card-user-cell';

type Props = {
  issuer: MockEntity;
  recipient: MockEntity;
};

export default function CardUsers({ issuer, recipient }: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'baseline' : 'center',
      }}
    >
      <CardUserCell user={issuer} label={t('credential.issuer-id')} />
      <Box
        sx={{
          py: isMobile ? 0 : 2,
          px: isMobile ? 3 : 2,
          transform: isMobile ? 'rotate(90deg)' : 'none',
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
      <CardUserCell
        user={recipient}
        label={t('credential.recipient-id')}
        alignRight={!isMobile}
      />
    </Stack>
  );
}
