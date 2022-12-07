import { useAuth } from 'apps/website/providers/auth';
import { PartialDeep } from 'type-fest';

import { Stack } from '@mui/material';

import {
  Gates,
  Manual_Task_Events,
  Scalars,
} from '../../../../../../../../services/graphql/types.generated';
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
      {status === 'in_review' && (
        <SubmissionWaiting username={gate.creator.username} />
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
