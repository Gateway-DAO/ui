import { useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { useAuth } from '../../../../../providers/auth';
import { GatePublishedNotification } from './custom/gate-published-notification';
import { ManualTaskEventNotification } from './custom/manual-task-event-notification';
import { ProtocolCredentialNotification } from './custom/protocol-credential-notification';

type Props = {
  id: string;
  event_type: string;
  opened: boolean;
  timestamp: string;
  data: any;
  isLast?: boolean;
  onRead?: () => void;
};

export function CustomNotification({
  id,
  event_type,
  timestamp,
  data,
  isLast,
  opened,
}: Props) {
  const { me } = useAuth();

  const [hasRead, setHasRead] = useState(opened);

  const onRead = async () => {
    if (!hasRead) {
      setHasRead(true);
      fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          queueUrl: process.env.NEXT_PUBLIC_READ_NOTIFICATIONS_QUEUE_URL,
          body: {
            user_id: me?.id,
            notification_id: id,
          },
        }),
      });
    }
  };

  return (
    <Stack
      component="div"
      direction="column"
      gap={1.75}
      sx={[
        { px: 2, pt: 0.5, pb: !isLast ? 1.75 : 4 },
        !hasRead && { backgroundColor: '#9A53FF29' },
      ]}
      onMouseEnter={onRead}
      onFocusCapture={onRead}
    >
      {event_type === 'gate_published' && (
        <GatePublishedNotification data={data} timestamp={timestamp} />
      )}
      {event_type === 'manual_task_event' && (
        <ManualTaskEventNotification data={data} timestamp={timestamp} />
      )}
      {event_type === 'protocol_credential' && (
        <ProtocolCredentialNotification data={data} timestamp={timestamp} />
      )}
    </Stack>
  );
}
