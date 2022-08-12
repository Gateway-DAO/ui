import { Avatar, Box, Button, Stack, Typography } from '@mui/material';

import type { Notification } from '../../../../types/cyberconnect';

type Props = Partial<Notification> & {
  isLast?: boolean;
};

export function Notification({
  id,
  hasRead,
  namespace,
  network,
  toAddress,
  timestamp,
  type,
  isLast,
}: Props) {
  return (
    <Stack
      direction="column"
      gap={2}
      sx={[
        { px: 4 },
        isLast ? { pt: 3, pb: 4 } : { py: 3 },
        !hasRead && { backgroundColor: '#9A53FF29' },
      ]}
    >
      <Stack direction="row" gap={2} alignItems="center">
        <Avatar></Avatar>
        <Box>
          <Typography variant="body1" color="text.secondary">
            <Typography component="span" color="text.primary">
              Kbooz
            </Typography>{' '}
            sent you a connection request
          </Typography>
          <Typography variant="body2" color="text.secondary">
            2 hours ago
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" gap={1} sx={{ pl: 6.75 }}>
        <Button variant="contained">Accept</Button>
        <Button variant="outlined">Decline</Button>
      </Stack>
    </Stack>
  );
}
