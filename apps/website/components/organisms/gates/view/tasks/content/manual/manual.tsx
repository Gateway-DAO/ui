import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import {
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useAuth } from '../../../../../../../providers/auth';
import { LoadingButton } from '../../../../../../atoms/loading-button';
import { TaskProps } from '../types';
import { InterationList } from './components/interation-list';

const ManualContent = ({
  task,
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}: TaskProps) => {
  const { t } = useTranslation('gate-profile');
  const { me, gqlAuthMethods } = useAuth();
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const [link, setLink] = useState<string>();
  const currentTaskProgress = me?.task_progresses?.find(
    (tp) => tp.task_id === task.id
  );

  const manualTaskEvents = useQuery(
    ['manual-task-events', currentTaskProgress?.id, me?.id],
    () =>
      gqlAuthMethods.manual_task_events({
        task_progress_id: currentTaskProgress!.id,
      }),
    {
      enabled: !!currentTaskProgress?.id,
    }
  );

  const onSubmitLink = async () => {
    await completeTask({
      event_type: 'send_link',
      data: 'https://www.google.com/',
    });
    manualTaskEvents.remove();
  };

  return (
    <Stack marginTop={4} alignItems="start">
      {!readOnly && (
        <>
          <Stack sx={{ width: '100%', mb: 5 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
            >
              {!completed && (
                <>
                  <TextField
                    required
                    label={t('tasks.manual.label')}
                    id="submit-link-address"
                    sx={{ flexGrow: 1 }}
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <LoadingButton
                    size="large"
                    variant="contained"
                    onClick={onSubmitLink}
                    isLoading={isLoading}
                  >
                    {t('tasks.manual.action')}
                  </LoadingButton>
                </>
              )}
            </Stack>
            {/*             <DocumentCard
              docTitle="Lorem ipsum"
              docUrl="https://www.site.com/"
              docText="Dolor sit amet propectus"
            ></DocumentCard> */}
          </Stack>
          <Divider sx={{ width: '100%', mb: 5 }} />
          {manualTaskEvents.isLoading ? (
            <CircularProgress />
          ) : (
            <InterationList
              list={manualTaskEvents.data?.manual_task_events ?? []}
              status={currentTaskProgress.completed}
            />
          )}
        </>
      )}

      {completed && updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2" sx={{ marginTop: 1 }}>
          {t('tasks.completed')}
          {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default ManualContent;
