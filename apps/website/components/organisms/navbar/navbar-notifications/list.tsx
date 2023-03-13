import { Stack } from '@mui/material';

import { EmptyNotifications } from './empty';
import { CustomNotification } from './notifications/custom';

export function NotificationList({ redisNotifications }) {
  const notifications = [...(redisNotifications || [])].sort(function (x, y) {
    return y.timestamp - x.timestamp;
  });

  if (!notifications.length) {
    return <EmptyNotifications />;
  }

  return (
    <Stack>
      {notifications.map((notification) => (
        <CustomNotification
          id={notification.id}
          key={notification.id}
          event_type={notification.event_type}
          opened={notification.opened}
          timestamp={notification.timestamp}
          data={
            notification.data ?? {
              ...notification,
            }
          }
        />
      ))}
    </Stack>
  );
}
