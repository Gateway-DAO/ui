import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useThrottle } from '@corets/use-throttle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
import LinkPreviewCard from './components/link-preview-card';

const ManualContent = ({
  gate,
  task,
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

  const queryClient = useQueryClient();

  const throttledLink = useThrottle(link, 1000);

  const linkPreview = useQuery(
    ['preview-link', throttledLink],
    async () => gqlAuthMethods.link_preview({ url: throttledLink }),
    { enabled: throttledLink?.length > 5, retry: false }
  );

  const isManualTaskEventsEnabled = !!currentTaskProgress?.id;

  const manualTaskEvents = useQuery(
    ['manual-task-events', currentTaskProgress?.id],
    () =>
      gqlAuthMethods.manual_task_events({
        task_progress_id: currentTaskProgress!.id,
      }),
    {
      enabled: isManualTaskEventsEnabled,
    }
  );

  const onSubmitLink = async () => {
    await completeTask({
      event_type: 'send_link',
      data: { link: linkPreview.data?.link_preview },
    });
    manualTaskEvents.remove();
    queryClient.removeQueries([
      'admin-manual-task-submissions',
      gate.id,
      me?.id,
    ]);
    setLink('');
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
                    error={!!linkPreview.error && !linkPreview.isFetching}
                    helperText={
                      (linkPreview.error as any)?.response?.errors[0]?.message
                    }
                  />
                  <LoadingButton
                    size="large"
                    variant="contained"
                    onClick={onSubmitLink}
                    isLoading={isLoading}
                    disabled={!linkPreview.data?.link_preview}
                  >
                    {t('tasks.manual.action')}
                  </LoadingButton>
                </>
              )}
            </Stack>
            {linkPreview.data?.link_preview && (
              <LinkPreviewCard {...linkPreview.data.link_preview} />
            )}
          </Stack>
          {isManualTaskEventsEnabled && manualTaskEvents.isLoading && (
            <CircularProgress />
          )}
          {isManualTaskEventsEnabled &&
            !manualTaskEvents.isLoading &&
            manualTaskEvents.data?.manual_task_events?.length > 0 && (
              <>
                <Divider sx={{ width: '100%', mb: 5 }} />
                <InterationList
                  list={manualTaskEvents.data?.manual_task_events ?? []}
                  gate={gate}
                  status={currentTaskProgress.completed}
                />
              </>
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