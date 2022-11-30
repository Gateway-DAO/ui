import { brandColors } from '@gateway/theme';

import { Stack, Typography, alpha } from '@mui/material';

import { SubmissionsItem, SubmissionsItemProps } from './submissions-item';

export type SubmissionsListProps = {
  title: string;
  list: SubmissionsItemProps[];
};

export function SubmissionsList({ title, list }: SubmissionsListProps) {
  return (
    <>
      <Typography
        fontSize={12}
        sx={{
          textTransform: 'uppercase',
          color: `${alpha(brandColors.white.main, 0.7)}`,
          px: 7.5,
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Stack sx={{ mb: 4 }}>
        {list
          .sort((a, b) => {
            return (
              new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
            );
          })
          .map((item, index) => (
            <SubmissionsItem
              key={index}
              username={item.username}
              datetime={item.datetime}
              approver={item.approver}
              type={item.type}
            />
          ))}
      </Stack>
    </>
  );
}
