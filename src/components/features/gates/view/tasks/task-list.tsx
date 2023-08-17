import { useRouter } from 'next/router';

import CircularProgressWithLabel from '@/components/atoms/loadings/circular-progress-label';
import { Task } from '@/components/features/gates/view/tasks';
import { Submissions } from '@/components/features/gates/view/tasks/manual/submissions';
import { ClientNav } from '@/components/organisms/navbar/client-nav';
import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { Gates } from '@/services/hasura/types';
import { TOKENS } from '@/theme';
import { useQueryClient } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { Box, Grid, Stack, Typography } from '@mui/material';

import { RecaptchaTask } from './recaptcha';

type Props = {
  gate: PartialDeep<Gates>;
  isAdmin: boolean;
  completedAt?: string;
  completedTasksCount: number;
  formattedDate: string;
  isCredentialExpired: boolean;
  setOpen: () => void;
};

export function TaskList({
  gate,
  isAdmin,
  completedAt,
  completedTasksCount,
  formattedDate,
  isCredentialExpired,
  setOpen,
}: Props) {
  const { me } = useAuth();
  const completedGate = !!completedAt;
  const totalTasksCount = completedGate
    ? gate.tasks.length
    : gate.tasks.length + 1;

  const manualTask = gate.tasks.find((task) => task.task_type === 'manual');
  const isGateAdmin = me?.id === gate.creator.id;
  const taskProgress = (completedTasksCount / totalTasksCount) * 100;
  const isTaskStarted = taskProgress === 0 ? false : true;
  const router = useRouter();

  const refetchLoyaltyPoints = () => {
    router.replace(router.asPath);
  };

  return (
    <Grid
      item
      xs={12}
      md
      sx={{
        pb: isGateAdmin && manualTask ? 20 : 0,
      }}
    >
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
            value={isTaskStarted ? taskProgress : 100}
            label={`${completedTasksCount}/${totalTasksCount}`}
            size={50}
            thickness={4}
            sx={{
              color: isTaskStarted ? '#6DFFB9' : '#FFFFFF4D',
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
            marginBottom: '24px',
          }}
          color={'#c5ffe3'}
        >
          You have completed this credential at {formattedDate}
        </Typography>
      ) : isCredentialExpired ? (
        <Typography
          sx={{
            margin: { xs: '16px 16px 40px 16px', md: '16px 75px 16px 75px' },
            py: 1,
            px: 4,
            border: 1,
            borderColor: '#FFA726',
            borderRadius: 1,
            marginBottom: '24px',
          }}
          color={'#FFA726'}
        >
          This credential is not available
        </Typography>
      ) : null}

      <Box>
        {gate.tasks
          ?.sort((a, b) => a.order - b.order)
          .map((task, idx) => (
            <Task
              key={'task-' + (idx + 1)}
              gate={gate}
              task={task}
              idx={idx + 1}
              isDefaultOpen={completedTasksCount === idx}
              readOnly={gate.published !== 'published' || isCredentialExpired}
              isAdmin={isAdmin}
            />
          ))}
        {!completedGate && (
          <RecaptchaTask
            taskNumber={totalTasksCount}
            gateId={gate.id}
            isEnabled={completedTasksCount + 1 === totalTasksCount}
            onCompleteGate={() => {
              setOpen();
              refetchLoyaltyPoints();
            }}
          />
        )}
      </Box>
      {isGateAdmin && !!manualTask && <Submissions gate={gate} />}
    </Grid>
  );
}
