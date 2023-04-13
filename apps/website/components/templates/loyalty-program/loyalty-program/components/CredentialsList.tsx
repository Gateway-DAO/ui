import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { Stack, Typography, Box, alpha } from '@mui/material';

import { Gates } from '../../../../../services/hasura/types';
import { CredentialListItem } from './CredentialListItem';

type Props = {
  gates?: PartialDeep<Gates>[];
};

export function CredentialsList({ gates }: Props) {
  const { t } = useTranslation('loyalty-program');

  return (
    <Box>
      <Typography
        fontSize={12}
        sx={{
          m: { xs: 2, md: '40px 60px 16px' },
          color: alpha(brandColors.white.main, 0.7),
          textTransform: 'uppercase',
        }}
      >
        {t('loyalty-program-page.missions')}
      </Typography>
      <Stack direction="column">
        {gates.map((gate) => (
          <CredentialListItem key={gate.id} gate={gate} />
        ))}
      </Stack>
    </Box>
  );
}
