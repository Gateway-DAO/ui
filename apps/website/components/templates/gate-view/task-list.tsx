import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Box, Grid, Stack, Typography } from '@mui/material';

import { Tasks } from '../../../services/graphql/types.generated';
import CircularProgressWithLabel from '../../atoms/circular-progress-label';
import { RecaptchaTask } from '../../organisms/gates/view/tasks/content/recaptcha';
import { ClientNav } from '../../organisms/navbar/client-nav';
import { Task } from '../../organisms/tasks';

type Props = {
  gateId: string;
  isAdmin: boolean;
  completedAt?: string;
  completedTasksCount: number;
  formattedDate: string;
  published: string;
  isCredentialExpired: boolean;
  tasks?: PartialDeep<Tasks>[];
  setOpen: () => void;
};

export function TaskList({
  gateId,
  isAdmin,
  completedAt,
  completedTasksCount,
  tasks = [],
  formattedDate,
  published,
  isCredentialExpired,
  setOpen,
}: Props) {
  const completedGate = !!completedAt;
  const totalTasksCount = completedGate ? tasks.length : tasks.length + 1;

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
            value={(completedTasksCount / totalTasksCount) * 100}
            label={`${completedTasksCount}/${totalTasksCount}`}
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
      {completedAt ? (
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

      <Box>
        {tasks
          .sort((a, b) => a.order - b.order)
          .map((task, idx) => (
            <Task
              key={'task-' + (idx + 1)}
              task={task}
              idx={idx + 1}
              isDefaultOpen={completedTasksCount === idx}
              readOnly={published !== 'published' || isCredentialExpired}
              isAdmin={isAdmin}
            />
          ))}
        {!completedGate && (
          <RecaptchaTask
            taskNumber={totalTasksCount}
            gateId={gateId}
            isEnabled={completedTasksCount + 1 === totalTasksCount}
            onCompleteGate={setOpen}
          />
        )}
      </Box>
    </Grid>
  );
}
