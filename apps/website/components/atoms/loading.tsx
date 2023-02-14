import { Box, CircularProgress } from '@mui/material';

type Props = {
  margin?: number;
};

export default function Loading({ margin }: Props): JSX.Element {
  return (
    <Box
      key="loading"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress sx={{ mt: 2, margin: margin ? margin : null }} />
    </Box>
  );
}
