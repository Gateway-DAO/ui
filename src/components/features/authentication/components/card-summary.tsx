import useTranslation from 'next-translate/useTranslation';

import { brandColors } from '@/theme';

import EditIcon from '@mui/icons-material/Edit';
import { alpha, Stack, Typography } from '@mui/material';

import { NewUserSchema } from '../schema';

type Props = {
  filledData: NewUserSchema;
  onClickEdit: () => void;
};

export function CardSummary({ filledData, onClickEdit }: Props) {
  const { t } = useTranslation('authentication');

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      gap={1}
      alignItems="center"
      sx={(theme) => ({
        width: '100%',
        p: 2,
        backgroundColor: theme.palette.background.elevated,
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        position: 'relative',
        top: { xs: -30, md: -40, lg: -50 },
      })}
    >
      <Stack direction="column">
        <Typography sx={{ fontWeight: 700, mb: 1 }}>
          {t('card-summary-title')}
        </Typography>
        <Typography sx={{ color: alpha(brandColors.white.main, 0.7) }}>
          @{filledData?.username}
        </Typography>
        <Typography sx={{ color: alpha(brandColors.white.main, 0.7) }}>
          {filledData?.email_address}
        </Typography>
      </Stack>
      <EditIcon
        onClick={() => onClickEdit()}
        sx={{
          color: alpha(brandColors.white.main, 0.7),
          cursor: 'pointer',
        }}
      />
    </Stack>
  );
}
