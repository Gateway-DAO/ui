import { Box, CircularProgress, Stack, Typography } from '@mui/material';

export function DirectWalletsUploading() {
  return (
    <Stack
      gap={2}
      alignItems="center"
      sx={{
        background: '#261738',
        borderRadius: 1,
        border: 1,
        borderStyle: 'solid',
        borderColor: 'primary.main',
        p: 3.75,
      }}
    >
      <CircularProgress size={56} />

      <Stack gap={0.5} alignItems="center">
        <Typography variant="body1">Uploading</Typography>
      </Stack>
    </Stack>
  );
}
