import { PartialDeep } from 'type-fest';

import { brandColors } from '@gateway/theme';

import { Stack, Typography, alpha } from '@mui/material';

import { Task_Progress } from '../../../../../../../../services/graphql/types.generated';
import { SubmissionsItem, SubmissionsItemProps } from './submissions-item';
export type SubmissionsListProps = {
  title: string;
  list: PartialDeep<Task_Progress>[];
};

export function SubmissionsList({ title, list }: SubmissionsListProps) {
  return (
    <>
      <Typography
        fontSize={12}
        sx={{
          textTransform: 'uppercase',
          color: `${alpha(brandColors.white.main, 0.7)}`,
          px: { xs: 2, lg: 7.5 },
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Stack sx={{ mb: { xs: 3, lg: 4 } }}>
        {list.map((item, index) => (
          <SubmissionsItem key={index} progress={item} />
        ))}
      </Stack>
    </>
  );
}
