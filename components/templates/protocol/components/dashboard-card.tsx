import useTranslation from 'next-translate/useTranslation';

import { brandColors } from 'apps/website/theme';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Stack, Paper, Typography, alpha, Chip } from '@mui/material';

type Props = {
  label: string;
  value: number;
  caption?: string;
  indicator?: number;
};

export default function DashboardCard({
  label,
  value,
  caption,
  indicator,
}: Props) {
  const { t, lang } = useTranslation('protocol');
  return (
    <Paper
      elevation={2}
      component={Stack}
      sx={{
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        p: 2,
        width: '100%',
      }}
    >
      <Typography
        fontSize={12}
        sx={{ color: alpha(brandColors.white.main, 0.7), mb: 0.5 }}
      >
        {label}
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{value?.toLocaleString(lang)}</Typography>
        {indicator ? (
          <Chip
            variant="filled"
            label={`${indicator * 100}%`}
            size="small"
            color={indicator > 0 ? 'success' : 'error'}
            icon={
              <ArrowUpwardIcon
                sx={{
                  width: '14px',
                  transform: indicator > 0 ? 'none' : 'rotate(180deg)',
                }}
              />
            }
            sx={{
              color: indicator > 0 ? brandColors.green.main : '#ffaec5',
              background: indicator > 0 ? '#385C57' : '#762b40',
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: 1,
            }}
          />
        ) : null}
      </Stack>
      {caption && (
        <Typography
          fontSize={12}
          sx={{ color: alpha(brandColors.white.main, 0.7) }}
        >
          {caption}
        </Typography>
      )}
    </Paper>
  );
}
