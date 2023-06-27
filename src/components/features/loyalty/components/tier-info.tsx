import useTranslation from 'next-translate/useTranslation';

import { brandColors } from '@/theme';

import { Stack, Typography } from '@mui/material';

type Props = {
  totalPoints: number;
  tier: string;
};

export default function TierInfo({
  totalPoints = 0,
  tier,
}: Props): JSX.Element {
  const { t } = useTranslation('loyalty-program');
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Typography fontSize={12} sx={{ color: brandColors.green.main }}>
        {tier && totalPoints > 0 && <>{tier}</>}
      </Typography>
      <Typography
        fontSize={12}
        sx={{ visibility: totalPoints > 0 ? 'default' : 'hidden' }}
      >
        {`${totalPoints} pts`}
      </Typography>
    </Stack>
  );
}
