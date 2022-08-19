import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';

import { useMenu } from '@gateway/ui';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Card, CardHeader, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';

import { EmptyNotifications } from './empty';
import { Notification } from './notification';

export function NavBarNotifications() {
  const { data } = useAccount();
  const userMenu = useMenu();

  const notificationsRes = {
    unreadNotificationCount: 0,
  };

  const icon = (
    <Avatar>
      <NotificationsIcon />
    </Avatar>
  );

  return (
    <>
      <Tooltip title="Open Notifications">
        <IconButton onClick={userMenu.onOpen}>
          {notificationsRes?.unreadNotificationCount ? (
            <Badge
              color="secondary"
              variant="dot"
              overlap="circular"
              badgeContent={notificationsRes.unreadNotificationCount}
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
          {/* <Stack>
            <Notification />
            <Notification isLast hasRead />
          </Stack> */}
          <EmptyNotifications />
        </Card>
      </Popover>
    </>
  );
}
