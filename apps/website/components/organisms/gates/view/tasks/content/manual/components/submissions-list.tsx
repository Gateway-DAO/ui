import { PartialDeep } from 'type-fest';

import { brandColors } from '@gateway/theme';

import { Stack, Typography, alpha, Divider } from '@mui/material';

import { Task_Progress } from '../../../../../../../../services/hasura/types';
import { SubmissionsItem } from './submissions-item';
export type SubmissionsListProps = {
  title: string;
  list: PartialDeep<Task_Progress>[];
  onSelect: (progressId: string) => void;
};

export function SubmissionsList({
  title,
  list,
  onSelect,
}: SubmissionsListProps) {
  return (
    <>
      <Typography
        fontSize={12}
        sx={{
          textTransform: 'uppercase',
          color: `${alpha(brandColors.white.main, 0.7)}`,
          px: { xs: 2, lg: 7.5 },
          mb: 1,
          mt: 2,
        }}
      >
        {title}
      </Typography>
      <Stack
        sx={{ mb: { xs: 3, lg: 4 } }}
        divider={<Divider sx={{ width: '100%' }} />}
      >
        {list.map((item, index) => (
          <SubmissionsItem key={index} progress={item} onSelect={onSelect} />
        ))}
      </Stack>
    </>
  );
}
