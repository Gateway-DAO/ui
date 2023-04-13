import useTranslation from 'next-translate/useTranslation';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { TOKENS, brandColors } from '@gateway/theme';

import { Stack, Typography, alpha } from '@mui/material';

import { AlertCustom } from '../../../../../components/atoms/alert';
import { query } from '../../../../../constants/queries';
import { useAuth } from '../../../../../providers/auth';
import { Gates, Loyalty_Program } from '../../../../../services/hasura/types';
import { CredentialListItem } from './CredentialListItem';

type Props = {
  gates: PartialDeep<Gates>[];
  loyalty: PartialDeep<Loyalty_Program>;
};

export function CredentialsList({ gates, loyalty }: Props) {
  const { t } = useTranslation('loyalty-program');
  const { me, gqlAuthMethods } = useAuth();

  const gatesCompleted = useQuery(
    [
      query.gate_progress_completed_by_loyalty_program,
      { userId: me?.id, loyaltyProgramId: loyalty?.id },
    ],
    () =>
      gqlAuthMethods.get_gate_progress_completed_by_loyalty_program({
        userId: me?.id,
        loyaltyProgramId: loyalty?.id,
      }),
    {
      select: (data) => data.gate_progress,
      enabled: !!me?.id,
    }
  );

  console.log('joao', gatesCompleted?.data);

  return (
    <Stack sx={{ mb: { xs: 5, md: 12 } }}>
      <Stack
        sx={{
          mx: TOKENS.CONTAINER_PX,
          mt: { xs: 2, md: 5 },
          mb: { xs: 2, md: 3 },
        }}
      >
        <Typography
          fontSize={12}
          sx={{
            color: alpha(brandColors.white.main, 0.7),
            textTransform: 'uppercase',
            mb: { xs: 2, md: 3 },
          }}
        >
          {t('loyalty-program-page.missions.title')}
        </Typography>
        {(gatesCompleted?.data?.length === 0 || !me?.id) && (
          <AlertCustom severity="error">
            {t('loyalty-program-page.missions.message-missions-empty')}
          </AlertCustom>
        )}
      </Stack>
      <Stack direction="column">
        {gates.map((gate) => (
          <CredentialListItem
            key={gate.id}
            gate={gate}
            gatesCompleted={gatesCompleted}
          />
        ))}
      </Stack>
    </Stack>
  );
}
