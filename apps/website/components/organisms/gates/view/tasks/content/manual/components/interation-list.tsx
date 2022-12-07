import { PartialDeep } from 'type-fest';

import { Stack } from '@mui/material';

import {
  Manual_Task_Events,
  Scalars,
} from '../../../../../../../../services/graphql/types.generated';
import { SubmissionWaiting } from './submissions-waiting';
import TaskInteration from './task-interation';

export type InterationListProps = {
  status: Scalars['key_status'];
  list: PartialDeep<Manual_Task_Events>[];
  elevation?: number;
};

export const InterationList = ({
  list,
  elevation = 1,
  status,
}: InterationListProps) => {
  return (
    <Stack sx={{ width: '100%' }}>
      {status !== 'reject' && status !== 'done' && (
        <SubmissionWaiting username="kbooz" />
      )}
      {list.map((event, index) => (
        <TaskInteration
          key={event.id}
          firstItem={index === 0}
          elevation={elevation}
          {...event}
        />
      ))}
    </Stack>
  );
};
