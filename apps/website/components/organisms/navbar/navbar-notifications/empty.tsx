import { Box, Typography } from '@mui/material';

export function EmptyNotifications() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="body2" color="text.secondary">
        No notifications yet
      </Typography>
    </Box>
  );
}
