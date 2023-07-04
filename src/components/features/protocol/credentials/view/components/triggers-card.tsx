import useTranslation from 'next-translate/useTranslation';

import { Protocol_Api_Credential } from '@/services/hasura/types';
import { brandColors } from '@/theme';
import { PartialDeep } from 'type-fest/source/partial-deep';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  alpha,
  Divider,
  Paper,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';

import TriggersItem from './triggers-item';

type Props = {
  credential: PartialDeep<Protocol_Api_Credential>;
};

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
      icon: <HighlightOffIcon sx={iconSx} />,
    },
    [triggersKey.suspensionConditions]: {
      name: t('credential.triggers.suspend-if'),
      icon: <HighlightOffIcon sx={iconSx} />,
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
          my: { xs: 2, md: 2 },
          mx: { xs: 3, md: 2 },
          mb: { xs: 0 },
        }}
      >
        {t('credential.triggers.title')}
      </Typography>
      <Stack divider={<Divider />}>
        {credential.revocationConditions && (
          <TriggersItem
            name={triggersData[triggersKey.revocationConditions].name}
            icon={triggersData[triggersKey.revocationConditions].icon}
            value={credential.revocationConditions}
          />
        )}
        {credential.suspensionConditions && (
          <TriggersItem
            name={triggersData[triggersKey.suspensionConditions].name}
            icon={triggersData[triggersKey.suspensionConditions].icon}
            value={credential.suspensionConditions}
          />
        )}
        {credential.updateConditions && (
          <TriggersItem
            name={triggersData[triggersKey.updateConditions].name}
            icon={triggersData[triggersKey.updateConditions].icon}
            value={credential.updateConditions}
          />
        )}
      </Stack>
    </Paper>
  );
}
