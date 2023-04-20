import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import RefreshIcon from '@mui/icons-material/Refresh';
import { alpha, Paper, Stack, SxProps, Typography } from '@mui/material';

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
    revocationConditions: 'revocationConditions',
    suspensionConditions: 'suspensionConditions',
    updateConditions: 'updateConditions',
  };

  const iconSx: SxProps = {
    fontSize: 20,
    color: alpha(brandColors.white.main, 0.7),
  };

  const triggersData = {
    [triggersKey.revocationConditions]: {
      name: t('credential.triggers.revoke-if'),
      icon: <RefreshIcon sx={iconSx} />,
    },
    [triggersKey.suspensionConditions]: {
      name: t('credential.triggers.suspend-if'),
      icon: <RefreshIcon sx={iconSx} />,
    },
    [triggersKey.updateConditions]: {
      name: t('credential.triggers.update-if'),
      icon: <RefreshIcon sx={iconSx} />,
    },
  };

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
        py: { xs: 2, md: 2 },
        px: { xs: 3, md: 2 },
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '14px',
          color: alpha(brandColors.white.main, 0.7),
          letterSpacing: '0.1px',
          mb: 2,
        }}
      >
        {t('credential.triggers.title')}
      </Typography>
      {credential.revocationConditions && (
        <Trigger
          name={triggersData[triggersKey.revocationConditions].name}
          icon={triggersData[triggersKey.revocationConditions].icon}
          value={credential.revocationConditions}
        />
      )}
      {credential.suspensionConditions && (
        <Trigger
          name={triggersData[triggersKey.suspensionConditions].name}
          icon={triggersData[triggersKey.suspensionConditions].icon}
          value={credential.suspensionConditions}
        />
      )}
      {credential.updateConditions && (
        <Trigger
          name={triggersData[triggersKey.updateConditions].name}
          icon={triggersData[triggersKey.updateConditions].icon}
          value={credential.updateConditions}
        />
      )}
    </Paper>
  );
}
