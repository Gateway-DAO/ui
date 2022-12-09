import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Box, Grid, Stack, Typography } from '@mui/material';

import { useAuth } from '../../../providers/auth';
import { Gates } from '../../../services/graphql/types.generated';
import CircularProgressWithLabel from '../../atoms/circular-progress-label';
import { SubmissionDetail } from '../../organisms/gates/view/tasks/content/manual/submission-detail';
import { Submissions } from '../../organisms/gates/view/tasks/content/manual/submissions';
import { RecaptchaTask } from '../../organisms/gates/view/tasks/content/recaptcha';
import { ClientNav } from '../../organisms/navbar/client-nav';
import { Task } from '../../organisms/tasks';

type Props = {
  gate: PartialDeep<Gates>;
  isAdmin: boolean;
  completedAt?: string;
  completedTasksCount: number;
  formattedDate: string;
  published: string;
  isCredentialExpired: boolean;
  setOpen: () => void;
};

export function TaskList({
  gate,
  isAdmin,
  completedAt,
  completedTasksCount,
  formattedDate,
  published,
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
  console.log(manualTask, isGateAdmin);
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
        {gate.tasks
          ?.sort((a, b) => a.order - b.order)
          .map((task, idx) => (
            <Task
              key={'task-' + (idx + 1)}
              gate={gate}
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
            gateId={gate.id}
            isEnabled={completedTasksCount + 1 === totalTasksCount}
            onCompleteGate={setOpen}
          />
        )}
      </Box>
      {isGateAdmin && !!manualTask && (
        <Submissions gate={gate} task={manualTask} />
      )}
    </Grid>
  );
}
