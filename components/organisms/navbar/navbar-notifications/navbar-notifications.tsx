import { useQuery } from '@tanstack/react-query';
import { useMenu } from '@/hooks/use-menu';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Card, CardHeader } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';

import { useAuth } from '@/providers/auth';
import { NotificationList } from './list';

export function NavBarNotifications() {
  const userMenu = useMenu();
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

  const unreadRedisNotifications = redisNotifications?.filter(
    (notification) => !notification.opened
  ).length;

  const icon = (
    <Avatar>
      <NotificationsIcon />
    </Avatar>
  );

  return (
    <>
      <Tooltip title="Open Notifications">
        <IconButton onClick={userMenu.onOpen}>
          {unreadRedisNotifications > 0 ? (
            <Badge
              color="primary"
              variant="dot"
              overlap="circular"
              badgeContent={parseInt(unreadRedisNotifications)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              {icon}
            </Badge>
          ) : (
            icon
          )}
        </IconButton>
      </Tooltip>
      <Popover
        id="menu-appbar"
        anchorEl={userMenu.element}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={userMenu.isOpen}
        onClose={userMenu.onClose}
      >
        <Card sx={{ width: { sm: 408 } }}>
          <CardHeader
            title="Notifications"
            titleTypographyProps={{ variant: 'body1', color: 'text.secondary' }}
          />
          <NotificationList redisNotifications={redisNotifications} />
        </Card>
      </Popover>
    </>
  );
}
