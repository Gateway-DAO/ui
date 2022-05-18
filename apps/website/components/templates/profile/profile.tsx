import { Stack } from '@mui/material';

export function ProfileTemplate() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
      gap={2}
      sx={{
        width: '100%',
        display: { xs: 'block', md: 'flex' },
        alignSelf: 'center',
        maxWidth: (theme) => theme.breakpoints.values.lg,
      }}
    >
      <p>Welcome to the profile page.</p>
    </Stack>
  );
}
