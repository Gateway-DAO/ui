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

import { gqlCyberConnectClient } from '../../../../services/cyberconnect-api';
import { EmptyNotifications } from './empty';
import { Notification } from './notification';

export function NavBarNotifications() {
  const { data } = useAccount();
  const userMenu = useMenu();

  const { data: notificationsRes } = useQuery(
    ['notifications'],
    () =>
      gqlCyberConnectClient.request<{
        identity: { unreadNotificationCount: number };
      }>(
        gql`
          query user_notifications($address: String!) {
            identity(address: $address, network: ETH) {
              unreadNotificationCount
              notifications {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  endCursor
                  startCursor
                }
                list {
                  id
                  toAddress
                  network
                  namespace
                  hasRead
                  type
                  timestamp
                  ... on NewConnectionNotification {
                    fromAddress
                    connectionType
                  }
                  ... on BiConnectReceivedNotification {
                    fromAddress
                  }
                  ... on BiConnectAcceptedNotification {
                    fromAddress
                  }
                }
              }
            }
          }
        `,
        { address: data?.address }
      ),
    {
      enabled: !!data?.address,
      refetchOnWindowFocus: true,
      select(data) {
        return data.identity;
      },
    }
  );

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
