import { Box, CircularProgress } from '@mui/material';

type Props = {
  margin?: number;
  marginTop?: number;
  size?: number;
};

export default function Loading({
  margin,
  marginTop = 2,
  size = 40,
}: Props): JSX.Element {
  return (
    <Box
      key="loading"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress
        size={size}
        sx={{ marginTop, margin: margin ? margin : null }}
      />
    </Box>
  );
}
