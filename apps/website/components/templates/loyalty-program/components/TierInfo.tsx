import { brandColors } from '@gateway/theme';

import { Stack, Typography } from '@mui/material';

import Loading from '../../../atoms/loading';

type Props = {
  isLoading?: boolean;
  totalPoints: number;
  tier: string;
};

export default function TierInfo({
  isLoading,
  totalPoints = 0,
  tier,
}: Props): JSX.Element {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Typography fontSize={12} sx={{ color: brandColors.green.main }}>
        {!isLoading ? tier : 'Loading..'}
      </Typography>
      <Typography
        fontSize={12}
        sx={{ visibility: totalPoints > 0 ? 'default' : 'hidden' }}
      >
        {!isLoading ? (
          `${totalPoints} pts`
        ) : (
          <Loading size={12} marginTop={0} />
        )}
      </Typography>
    </Stack>
  );
}
