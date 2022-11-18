import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'apps/website/providers/auth';

import { useCyberConnect } from '../../../../providers/cyberconnect';
import { NotificationType } from '../../../../services-cyberconnect/types.generated';
import { EmptyNotifications } from './empty';
import { NotificationMethods } from './item-methods';
import { AcceptedConnectionNotification } from './notifications/accepted-connection';
import { NewConnectionNotification } from './notifications/new-connection';
import { CustomNotification } from './notifications/custom';

export function NotificationList() {
  const { isLoading, notifications: CCNotifications } = useCyberConnect();
  const { me } = useAuth();

  const { data: redisNotifications } = useQuery(
    ['user-notifications', me?.id],
    async () => {
      const res = await fetch(`/api/notifications?userId=${me?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      const notifications = JSON.parse(data.notifications);

      return notifications;
    },
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

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
        const isCustom = notification.hasOwnProperty('event_type');
        let notificationData = {};

        if (isCustom) {
          const { event_type, opened, createdAt, ...rest } = notification;
          notificationData = rest;
        }

        return isCustom ? (
          <CustomNotification
            id={notification.id}
            event_type={notification.event_type}
            opened={notification.opened}
            timestamp={notification.timestamp}
            data={notificationData}
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
