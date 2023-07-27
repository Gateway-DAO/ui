import { Box, Button, Stack, Typography } from '@mui/material';
import { Dispatch, useEffect, useRef, useState } from 'react';

import TaskArea from '@/components/features/gates/create/tasks/tasks-area';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import { CreateGateData } from '../../schema';

export default function TasksTemplate({
  updateFormState,
  handleStep,
  input,
}: {
  updateFormState: Dispatch<any>;
  handleStep: (value: boolean) => void;
  input: any;
}) {
  const { t } = useTranslation('quest');
  const {
    formState: { errors, isValid },
  } = useFormContext<CreateGateData>();
  useEffect(() => {
    handleStep(isValid);
  }, [isValid]);

  const [deletedTasks, setDeletedTasks] = useState<string[]>([]);

  return (
    <Stack direction={'column'} mx={{ xs: 2, md: 7 }} mb={5}>
      <Box>
        <Typography variant="h5" gutterBottom>
          {t('template.tasks.title')}
        </Typography>
        <Typography variant="body2" gutterBottom mb={2}>
          {t('template.tasks.desc')}
        </Typography>

        <Stack direction="column" gap={2}>
          <TaskArea
            draftTasks={[]}
            onDelete={setDeletedTasks}
            handleStep={handleStep}
          />
        </Stack>
      </Box>
    </Stack>
  );
}
