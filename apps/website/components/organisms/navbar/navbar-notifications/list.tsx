import { Stack } from '@mui/material';

import { useCyberConnect } from '../../../../providers/cyberconnect';
import { NotificationType } from '../../../../services-cyberconnect/types.generated';
import { EmptyNotifications } from './empty';
import { NotificationMethods } from './item-methods';
import { AcceptedConnectionNotification } from './notifications/accepted-connection';
import { CustomNotification } from './notifications/custom';
import { NewConnectionNotification } from './notifications/new-connection';

export function NotificationList({ redisNotifications }) {
  const { isLoading, notifications: CCNotifications } = useCyberConnect();

  const notifications = [
    ...CCNotifications,
    ...(redisNotifications || []),
  ].sort(function (x, y) {
    return y.timestamp - x.timestamp;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!notifications.length) {
    return <EmptyNotifications />;
  }

  return (
    <Stack>
      {notifications.map((notification, index) => {
        return notification?.event_type ? (
          <CustomNotification
            id={notification.id}
            event_type={notification.event_type}
            opened={notification.opened}
            timestamp={notification.timestamp}
            data={
              notification.data ?? {
                ...notification,
              }
            }
          />
        ) : (
          <NotificationMethods key={notification.id} {...notification}>
            {(methods) => (
              <>
                {notification.type === NotificationType.BiconnectReceived && (
                  <NewConnectionNotification
                    {...notification}
                    {...methods}
                    isLast={CCNotifications.length - 1 === index}
                  />
                )}
                {notification.type === NotificationType.BiconnectAccepted && (
                  <AcceptedConnectionNotification
                    {...notification}
                    {...methods}
                    isLast={CCNotifications.length - 1 === index}
                  />
                )}
              </>
            )}
          </NotificationMethods>
        );
      })}
    </Stack>
  );
}
