import { useQueryClient } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Box, Grid, Stack, Typography } from '@mui/material';

import { query } from '../../../constants/queries';
import { useAuth } from '../../../providers/auth';
import { Gates } from '../../../services/hasura/types';
import CircularProgressWithLabel from '../../atoms/circular-progress-label';
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
  const queryClient = useQueryClient();

  const refetchTotalPoints = () => {
    if (gate.loyalty_id) {
      queryClient.refetchQueries([
        query.gate_progress_completed_by_loyalty_program,
        { userId: me?.id, loyaltyProgramId: gate?.loyalty_id },
      ]);
      queryClient.refetchQueries([
        query.protocol_credential_by_loyalty_id_by_gate_id,
        {
          user_id: me?.id,
          loyalty_id: gate?.loyalty_id,
          gate_id: gate?.id,
        },
      ]);
    }
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
              refetchTotalPoints();
            }}
          />
        )}
      </Box>
      {isGateAdmin && !!manualTask && (
        <Submissions gate={gate} task={manualTask} />
      )}
    </Grid>
  );
}
