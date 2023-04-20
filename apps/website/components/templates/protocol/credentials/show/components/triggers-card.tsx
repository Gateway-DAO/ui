import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import RefreshIcon from '@mui/icons-material/Refresh';
import { alpha, Box, Paper, Stack, SxProps, Typography } from '@mui/material';

import { Credential } from '../../../../../../services/gateway-protocol/types';

type Props = {
  credential: PartialDeep<Credential>;
};

function Trigger({
  name,
  value,
  icon,
}: {
  name: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <Stack direction="row" justifyContent="space-between" gap={1}>
      {icon}
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 14,
          color: alpha(brandColors.white.main, 0.7),
          flexGrow: 1,
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 14,
          color: brandColors.white.main,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

export default function TriggersCard({ credential }: Props) {
  const { t } = useTranslation('protocol');

  const triggersKey = {
    revokedConditions: 'revokedConditions',
    suspendedConditions: 'suspendedConditions',
    updatedConditions: 'updatedConditions',
  };

  const iconSx: SxProps = {
    fontSize: 20,
    color: alpha(brandColors.white.main, 0.7),
  };

  const triggersData = {
    [triggersKey.revokedConditions]: {
      name: t('credential.triggers.revoke-if'),
      icon: <RefreshIcon sx={iconSx} />,
    },
    [triggersKey.suspendedConditions]: {
      name: t('credential.triggers.suspend-if'),
      icon: <RefreshIcon sx={iconSx} />,
    },
    [triggersKey.updatedConditions]: {
      name: t('credential.triggers.update-if'),
      icon: <RefreshIcon sx={iconSx} />,
    },
  };

  console.log(credential);

  return (
    <Paper
      elevation={2}
      component={Stack}
      sx={{
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        mb: 3,
        overflow: 'hidden',
        boxShadow: 'none',
      }}
    >
      <Box
        sx={{
          py: { xs: 2, md: 2 },
          px: { xs: 3, md: 2 },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '14px',
            color: alpha(brandColors.white.main, 0.7),
            letterSpacing: '0.1px',
          }}
        >
          {t('credential.triggers.title')}
        </Typography>
      </Box>
      {credential.revokedConditions && (
        <Trigger
          name={triggersData[triggersKey.revokedConditions].name}
          icon={triggersData[triggersKey.revokedConditions].icon}
          value={credential.revokedConditions}
        />
      )}
      {credential.suspendedConditions && (
        <Trigger
          name={triggersData[triggersKey.suspendedConditions].name}
          icon={triggersData[triggersKey.suspendedConditions].icon}
          value={credential.suspendedConditions}
        />
      )}
    </Paper>
  );
}
