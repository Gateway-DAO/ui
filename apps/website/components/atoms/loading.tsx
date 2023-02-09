import { Box, CircularProgress } from '@mui/material';

export default function Loading(): JSX.Element {
  return (
    <Box
      key="loading"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress sx={{ mt: 2 }} />
    </Box>
  );
}
