import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { TOKENS, brandColors } from '@gateway/theme';

import { Stack, Typography, alpha } from '@mui/material';

import { Gates, Loyalty_Program } from '../../../../../services/hasura/types';
import { CredentialListItem } from './CredentialListItem';

type Props = {
  gates: PartialDeep<Gates>[];
  loyalty: PartialDeep<Loyalty_Program>;
};

export function CredentialsList({ gates, loyalty }: Props) {
  const { t } = useTranslation('loyalty-program');

  return (
    <Stack sx={{ mb: { xs: 5, md: 12 } }}>
      <Typography
        fontSize={12}
        sx={{
          mx: TOKENS.CONTAINER_PX,
          mt: { xs: 2, md: 5 },
          mb: { xs: 2, md: 2 },
          color: alpha(brandColors.white.main, 0.7),
          textTransform: 'uppercase',
        }}
      >
        {t('loyalty-program-page.missions')}
      </Typography>
      <Stack direction="column">
        {gates.map((gate) => (
          <CredentialListItem key={gate.id} gate={gate} loyalty={loyalty} />
        ))}
      </Stack>
    </Stack>
  );
}
