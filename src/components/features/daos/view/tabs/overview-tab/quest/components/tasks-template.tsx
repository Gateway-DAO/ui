import { Box, Button, Stack, Typography } from '@mui/material';
import { Dispatch, useEffect, useRef, useState } from 'react';
import {
  FormProvider,
  useForm,
  useFormContext,
  ValidationMode,
} from 'react-hook-form';

import TaskArea from '@/components/features/gates/create/tasks/tasks-area';

export default function TasksTemplate({
  updateFormState,
  handleStep,
  input,
}: {
  updateFormState: Dispatch<any>;
  handleStep: (value: boolean) => void;
  input: any;
}) {
  const [deletedTasks, setDeletedTasks] = useState<string[]>([]);

  return (
    <Stack direction={'column'} mx={7} mb={5}>
      <Box>
        <Typography variant="h5">Set tasks</Typography>
        <Typography variant="body2">
          Add tasks to your quest that users need to accomplish to earn this
          credential.
        </Typography>

        <Stack direction="column" gap={2}>
          <TaskArea draftTasks={[]} onDelete={setDeletedTasks} />
        </Stack>
      </Box>
    </Stack>
  );
}
