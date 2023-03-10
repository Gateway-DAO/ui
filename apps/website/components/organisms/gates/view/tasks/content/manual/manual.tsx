import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useThrottle } from '@corets/use-throttle';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import {
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { taskErrorMessages } from '../../../../../../../components/organisms/tasks/task-error-messages';
import { useAuth } from '../../../../../../../providers/auth';
import { LoadingButton } from '../../../../../../atoms/loading-button';
import { TaskProps } from '../types';
import { InterationList } from './components/interation-list';
import LinkPreviewCard from './components/link-preview-card';

const ManualContent = ({
  gate,
  task,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}: TaskProps) => {
  const { t } = useTranslation('gate-profile');
  const { me, gqlAuthMethods } = useAuth();
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const [link, setLink] = useState<string>();
  const [comment, setComment] = useState<string>();
  const currentTaskProgress = me?.task_progresses?.find(
    (tp) => tp.task_id === task.id
  );

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

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
      onSuccess() {
        queryClient.refetchQueries(['user_task_progresses', me?.id]);
      },
      refetchInterval(data) {
        if (
          data?.manual_task_events.some(
            ({ event_type }) =>
              event_type === 'approve' || event_type === 'reject'
          )
        ) {
          return false;
        }
        return 2000;
      },
      onError(error: any) {
        if (error?.response?.errors[0]?.message) {
          enqueueSnackbar(
            taskErrorMessages[error?.response?.errors[0]?.message] ||
              taskErrorMessages['UNEXPECTED_ERROR'],
            {
              variant: 'error',
            }
          );
        }
      },
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    }
  );

  const onSubmitLink = async () => {
    await completeTask({
      event_type: 'send_link',
      data: {
        link: linkPreview.data?.link_preview,
        task_progress_id: currentTaskProgress?.id,
      },
    });
    manualTaskEvents.remove();
    queryClient.removeQueries([
      'admin-manual-task-submissions',
      gate.id,
      me?.id,
    ]);
    setLink('');
  };

  const onSubmitComment = async () => {
    await completeTask({
      event_type: 'comment',
      data: {
        comment,
        task_progress_id: currentTaskProgress?.id,
      },
    });
    manualTaskEvents.remove();
    queryClient.removeQueries([
      'admin-manual-task-submissions',
      gate.id,
      me?.id,
    ]);
    setComment('');
  };

  const completed =
    currentTaskProgress?.completed === 'done' ||
    currentTaskProgress?.completed === 'reject';

  return (
    <Stack marginTop={4} alignItems="start">
      {!readOnly && (
        <>
          {!completed && (
            <Stack sx={{ width: '100%', mb: 5 }}>
              {task.task_data?.event_type === 'send_link' && (
                <>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                  >
                    <TextField
                      required
                      label={t('tasks.manual.label_link')}
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
                  </Stack>
                  {linkPreview.data?.link_preview && (
                    <LinkPreviewCard {...linkPreview.data.link_preview} />
                  )}
                </>
              )}
              {task.task_data?.event_type === 'comment' && (
                <>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                  >
                    <TextField
                      required
                      label={t('tasks.manual.label_comment')}
                      id="submit-comment"
                      sx={{ flexGrow: 1 }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      multiline
                    />
                  </Stack>
                  <LoadingButton
                    sx={{
                      marginTop: 2,
                    }}
                    size="large"
                    variant="contained"
                    onClick={onSubmitComment}
                    isLoading={isLoading}
                    disabled={!comment}
                  >
                    {t('tasks.manual.action')}
                  </LoadingButton>
                </>
              )}
            </Stack>
          )}

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
