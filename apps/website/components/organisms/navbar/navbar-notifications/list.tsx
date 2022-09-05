import { Stack } from '@mui/material';

import { useCyberConnect } from '../../../../providers/cyberconnect';
import { NotificationType } from '../../../../services-cyberconnect/types.generated';
import { EmptyNotifications } from './empty';
import { NotificationMethods } from './item-methods';
import { AcceptedConnectionNotification } from './notifications/accepted-connection';
import { NewConnectionNotification } from './notifications/new-connection';

export function NotificationList() {
  const { isLoading, notifications } = useCyberConnect();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!notifications.length) {
    return <EmptyNotifications />;
  }

  return (
    <Stack>
      {notifications.map((notification, index) => (
        <NotificationMethods key={notification.id} {...notification}>
          {(methods) => (
            <>
              {notification.type === NotificationType.BiconnectReceived && (
                <NewConnectionNotification
                  {...notification}
                  {...methods}
                  isLast={notifications.length - 1 === index}
                />
              )}
              {notification.type === NotificationType.BiconnectAccepted && (
                <AcceptedConnectionNotification
                  {...notification}
                  {...methods}
                  isLast={notifications.length - 1 === index}
                />
              )}
            </>
          )}
        </NotificationMethods>
      ))}
    </Stack>
  );
}
