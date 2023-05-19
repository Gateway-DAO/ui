import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { TOKENS, brandColors } from '@/theme';

import { Stack, Typography, alpha } from '@mui/material';

import { AlertCustom } from '../../../../components/atoms/alert';
import { useLoyaltyGatesCompleted } from '@/hooks/use-loyalty-gates-completed';
import { useAuth } from '../../../../providers/auth';
import {
  Credentials,
  Gates,
  Loyalty_Program,
} from '@/services/hasura/types';
import { CredentialListItem } from './CredentialListItem';

type Props = {
  gates: PartialDeep<Gates>[];
  loyalty: PartialDeep<Loyalty_Program>;
};

export function CredentialsList({ gates, loyalty }: Props) {
  const { t } = useTranslation('loyalty-program');
  const { me } = useAuth();

  const { gatesCompleted, isLoading } = useLoyaltyGatesCompleted({
    loyaltyProgramId: loyalty.id,
  });

  const gateIsCompleted = (
    gatesCompleted: PartialDeep<Credentials>[],
    gate: PartialDeep<Gates>
  ) => {
    return gatesCompleted?.find(
      (gateProgress) => gateProgress.gate.id === gate.id
    )
      ? 1
      : 0;
  };

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
          {t('missions.title')}
        </Typography>
        {(gatesCompleted?.length === 0 || !me?.id) && (
          <AlertCustom severity="error">
            {t('missions.message-missions-empty')}
          </AlertCustom>
        )}
      </Stack>
      <Stack direction="column">
        {gates
          .sort((a, b) => {
            return (
              gateIsCompleted(gatesCompleted, b) -
              gateIsCompleted(gatesCompleted, a)
            );
          })
          .map((gate) => (
            <CredentialListItem
              key={gate.id}
              gate={gate}
              gateIsCompleted={!!gateIsCompleted(gatesCompleted, gate)}
              isLoading={isLoading}
            />
          ))}
      </Stack>
    </Stack>
  );
}
