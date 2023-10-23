import useTranslation from 'next-translate/useTranslation';

import { AlertCustom } from '@/components/atoms/alert';
import { useAuth } from '@/providers/auth';
import { Protocol_Credential } from '@/services/hasura/types';
import { TOKENS, brandColors } from '@/theme';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, Typography, alpha } from '@mui/material';

import { CredentialListItem } from './credential-list-item';

type Props = {
  pdas: PartialDeep<Protocol_Credential>[];
};

export function CredentialsList({ pdas = [] }: Props) {
  const { t } = useTranslation('loyalty-program');
  const { me } = useAuth();

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
        {(pdas?.length === 0 || !me?.id) && (
          <AlertCustom severity="error">
            {t('missions.message-missions-empty')}
          </AlertCustom>
        )}
      </Stack>
      <Stack direction="column">
        {pdas
          ?.sort((a, b) => {
            return b.createdAt - a.createdAt;
          })
          .map((pda) => (
            <CredentialListItem
              key={pda.id}
              gate={pda}
              protocol_id={pda.id}
              image={pda.image}
              gateIsCompleted={true}
              points={pda?.claim.points}
            />
          ))}
      </Stack>
    </Stack>
  );
}
