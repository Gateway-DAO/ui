import { Gates, Manual_Task_Events, Scalars } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

import { Stack } from '@mui/material';

import { SubmissionWaiting } from './submissions-waiting';
import TaskInteration from './task-interation';

export type InterationListProps = {
  status: Scalars['key_status'];
  gate: PartialDeep<Gates>;
  list: PartialDeep<Manual_Task_Events>[];
  elevation?: number;
};

export const InterationList = ({
  gate,
  list,
  elevation = 1,
  status,
}: InterationListProps) => {
  return (
    <Stack sx={{ width: '100%' }}>
      {list?.length > 0 && status === 'in_review' && (
        <SubmissionWaiting username={gate?.creator?.username} />
      )}
      {list.map((event, index) => (
        <TaskInteration
          key={event.id}
          lastItem={index === list.length - 1}
          elevation={elevation}
          {...event}
        />
      ))}
    </Stack>
  );
};
