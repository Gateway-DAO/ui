import { PartialDeep } from 'type-fest';

import { Stack } from '@mui/material';

import { Manual_Task_Events } from '../../../../../../../../services/graphql/types.generated';
import TaskInteration from './task-interation';

export type InterationListProps = {
  list: PartialDeep<Manual_Task_Events>[];
  elevation?: number;
};

export const InterationList = ({
  list,
  elevation = 1,
}: InterationListProps) => {
  return (
    <Stack sx={{ width: '100%' }}>
      {list.map((event, index) => (
        <TaskInteration
          key={event.id}
          firstItem={index === 0}
          {...event}
          elevation={elevation}
        />
      ))}
    </Stack>
  );
};
