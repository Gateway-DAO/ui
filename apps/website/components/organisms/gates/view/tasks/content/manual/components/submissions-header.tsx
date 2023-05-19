import useTranslation from 'next-translate/useTranslation';

import { brandColors } from 'apps/website/theme';

import { Stack, Typography } from '@mui/material';

type SubmissionsHeaderProps = {
  isLoading: boolean;
  amount: number;
  amountNew: number;
};

export function SubmissionsHeader({
  isLoading,
  amount,
  amountNew,
}: SubmissionsHeaderProps) {
  const { t } = useTranslation('gate-profile');
  return (
    <Stack>
      <Typography
        fontSize={12}
        sx={(theme) => ({
          color: theme.palette.grey[500],
          mb: 0.5,
        })}
      >
        {t('submissions.title')}
      </Typography>
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography fontSize={20} fontWeight={700}>
          {isLoading ? t('common:action.loading') : amount}
        </Typography>
        {amountNew > 0 && (
          <Typography
            fontSize={13}
            sx={{
              background: brandColors.purple.main,
              borderRadius: 2,
              py: 0.375,
              px: 1,
              height: 24,
              lineHeight: 1.3,
            }}
          >
            {amountNew} new
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
