import useTranslation from 'next-translate/useTranslation';

import { brandColors } from '@gateway/theme';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Stack, Typography } from '@mui/material';

type SubmissionsHeaderProps = {
  expanded: boolean;
  clickHandler: () => void;
  amount: number;
  amountNew: number;
};

export function SubmissionsHeader({
  expanded,
  clickHandler,
  amount,
  amountNew,
}: SubmissionsHeaderProps) {
  const { t } = useTranslation('gate-profile');
  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: '100%',
        borderRadius: '8px 8px 0 0',
        pt: 6,
        pb: 5,
        px: 7.5,
        cursor: 'pointer',
        boxShadow:
          '0px -5px 5px -3px rgba(0, 0, 0, 0.2), 0px -8px 10px 1px rgba(0, 0, 0, 0.14), 0px -3px 14px 2px rgba(0, 0, 0, 0.12)',
      }}
      onClick={() => clickHandler()}
    >
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
            {amount}
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
                lineHeight: 1.2,
              }}
            >
              {amountNew} new
            </Typography>
          )}
        </Stack>
      </Stack>
      <KeyboardArrowDownIcon
        sx={{
          transition: 'all .4s ease',
          transform: !expanded ? 'rotateX(180deg)' : 'none',
          cursor: 'pointer',
        }}
      />
    </Stack>
  );
}
