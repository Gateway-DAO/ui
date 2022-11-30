import { Stack } from '@mui/material';

import TaskInteration, { TaskInterationProps } from './task-interation';

export type InterationListProps = {
  list: TaskInterationProps[];
  elevation?: number;
};

export const InterationList = ({
  list,
  elevation = 1,
}: InterationListProps) => {
  return (
    <Stack sx={{ width: '100%' }}>
      {list
        .sort((a, b) => {
          return (
            new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
          );
        })
        .map((item, index) => (
          <TaskInteration
            key={index}
            type={item.type}
            datetime={item.datetime}
            username={item.username}
            firstItem={item.firstItem}
            comment={item.comment}
            fullname={item.fullname}
            docTitle={item.docTitle}
            docText={item.docText}
            docUrl={item.docUrl}
            elevation={elevation}
          />
        ))}
    </Stack>
  );
};
