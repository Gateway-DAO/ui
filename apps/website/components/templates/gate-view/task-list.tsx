import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Box, Grid, Stack, Typography } from '@mui/material';

import { Tasks } from '../../../services/graphql/types.generated';
import CircularProgressWithLabel from '../../atoms/circular-progress-label';
import { ClientNav } from '../../organisms/navbar/client-nav';
import { Task, TaskGroup } from '../../organisms/tasks';

type Props = {
  isAdmin: boolean;
  completedAt: string;
  completedTasksCount: number;
  formattedDate: string;
  published: string;
  isCredentialExpired: boolean;
  tasks?: PartialDeep<Tasks>[];
  setOpen: (open: boolean) => void;
};

export function TaskList({
  isAdmin,
  completedAt,
  completedTasksCount,
  tasks = [],
  formattedDate,
  published,
  isCredentialExpired,
  setOpen,
}: Props) {
  return (
    <Grid item xs={12} md>
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{
          px: TOKENS.CONTAINER_PX,
          flexGrow: {
            md: 0.5,
          },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <ClientNav />
      </Stack>
      {/* Task Counter */}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          margin: { xs: '16px 16px 40px 16px', md: '60px' },
        }}
      >
        <Box display={'flex'}>
          <CircularProgressWithLabel
            variant="determinate"
            value={(completedTasksCount / tasks.length) * 100}
            label={`${completedTasksCount}/${tasks.length}`}
            size={50}
            thickness={4}
            sx={{
              color: '#6DFFB9',
            }}
          />
          <Stack
            sx={{
              marginLeft: (theme) => theme.spacing(4),
            }}
          >
            <Typography variant="h6">Tasks</Typography>
            <Typography variant="caption">
              Complete the tasks to unlock this credential
            </Typography>
          </Stack>
        </Box>
      </Stack>
      {!!completedAt ? (
        <Typography
          sx={{
            marginX: TOKENS.CONTAINER_PX,
            py: 1,
            px: 4,
            border: 1,
            borderRadius: 1,
          }}
          color={'#c5ffe3'}
        >
          You have completed this credential at {formattedDate}
        </Typography>
      ) : isCredentialExpired ? (
        <Typography
          sx={{
            marginX: TOKENS.CONTAINER_PX,
            py: 1,
            px: 4,
            border: 1,
            borderColor: '#FFA726',
            borderRadius: 1,
          }}
          color={'#FFA726'}
        >
          This credential is not available
        </Typography>
      ) : null}

      <TaskGroup>
        {tasks
          .sort((a, b) => a.order - b.order)
          .map((task, idx) => (
            <Task
              key={'task-' + (idx + 1)}
              task={task}
              readOnly={published !== 'published' || isCredentialExpired}
              setCompletedGate={setOpen}
              isAdmin={isAdmin}
            />
          ))}
      </TaskGroup>
    </Grid>
  );
}
