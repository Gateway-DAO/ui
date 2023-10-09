import useTranslation from 'next-translate/useTranslation';

import { AlertCustom } from '@/components/atoms/alert';
import { useAuth } from '@/providers/auth';
import { Credentials, Gates } from '@/services/hasura/types';
import { TOKENS, brandColors } from '@/theme';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, Typography, alpha } from '@mui/material';

import { CredentialListItem } from './credential-list-item';

type Props = {
  gates: PartialDeep<Gates>[];
  credentialsByLoyalty: PartialDeep<Credentials>[];
};

export function CredentialsList({ gates, credentialsByLoyalty }: Props) {
  const { t } = useTranslation('loyalty-program');
  const { me } = useAuth();

  const gateIsCompleted = (
    credentials: PartialDeep<Credentials>[],
    gate: PartialDeep<Gates>
  ) => {
    return credentials?.find(
      (c) => c?.gate?.id === gate?.id && c.credentials_protocol
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
        {(credentialsByLoyalty?.length === 0 || !me?.id) && (
          <AlertCustom severity="error">
            {t('missions.message-missions-empty')}
          </AlertCustom>
        )}
      </Stack>
      <Stack direction="column">
        {gates
          .sort((a, b) => {
            return (
              gateIsCompleted(credentialsByLoyalty, b) -
              gateIsCompleted(credentialsByLoyalty, a)
            );
          })
          .map((gate) => (
            <CredentialListItem
              key={gate.id}
              gate={gate}
              protocol_id={
                credentialsByLoyalty?.find((c) => c?.gate?.id === gate?.id)
                  ?.credentials_protocol?.id
              }
              image={
                credentialsByLoyalty?.find((c) => c?.gate?.id === gate?.id)
                  ?.credentials_protocol?.image
              }
              gateIsCompleted={!!gateIsCompleted(credentialsByLoyalty, gate)}
              points={
                credentialsByLoyalty.find((c) => c?.gate?.id === gate?.id)
                  ?.points ?? gate?.points
              }
            />
          ))}
      </Stack>
    </Stack>
  );
}
