import useTranslation from 'next-translate/useTranslation';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { PartialDeep } from 'type-fest';

import { CircularProgress, Divider, Stack, TextField } from '@mui/material';

import { taskErrorMessages } from '../../../../../../../components/organisms/tasks/task-error-messages';
import { useAuth } from '@/providers/auth';
import {
  Task_Progress,
  Gates,
  Complete_TaskMutation,
} from '@/services/hasura/types';
import { ManualTaskEventType } from '../../../../../../../types/tasks';
import { LoadingButton } from '@/components/atoms/loading-button';
import { InterationList } from './components/interation-list';

export type SubmissionDetailProps = {
  gate: PartialDeep<Gates>;
  progress: PartialDeep<Task_Progress>;
  isSubmitEventLoading: boolean;
  latestSubmitEvent?: ManualTaskEventType;
  onSubmitEvent: (
    event_type: ManualTaskEventType,
    data: any
  ) => Promise<Complete_TaskMutation>;
};

export function SubmissionDetail({
  latestSubmitEvent,
  progress,
  gate,
  isSubmitEventLoading,
  onSubmitEvent,
}: SubmissionDetailProps) {
  const { me, gqlAuthMethods } = useAuth();
  const { t } = useTranslation('gate-profile');
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const manualTaskEvents = useQuery(
    ['manual-task-events', progress?.id],
    () =>
      gqlAuthMethods.manual_task_events({
        task_progress_id: progress?.id,
      }),
    {
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
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    if (manualTaskEvents?.isLoading) return;
    onSubmitEvent('comment', data)
      .then(() => setValue('comment', ''))
      .catch((error) => {
        if (error?.response?.errors?.[0]?.message) {
          enqueueSnackbar(
            taskErrorMessages[error?.response?.errors[0]?.message] ||
              taskErrorMessages['UNEXPECTED_ERROR'],
            {
              variant: 'error',
            }
          );
        }
      });
  });

  return (
    <>
      {manualTaskEvents?.isLoading ? (
        <CircularProgress sx={{ alignSelf: 'center', my: 10 }} />
      ) : (
        <Stack
          sx={{
            px: 7.5,
            overflow: 'auto',
            flexGrow: 1,
            pt: 2,
          }}
        >
          <InterationList
            list={manualTaskEvents?.data?.manual_task_events}
            elevation={20}
            gate={gate}
            status={progress?.completed}
          />
        </Stack>
      )}
      <Stack
        component="form"
        onSubmit={onSubmit}
        sx={{ minHeight: '270px', flexGrow: 0, height: 'auto' }}
      >
        <Divider sx={{ width: '100%', mb: 3 }} />
        <Stack sx={{ px: 7.5, mb: 3 }}>
          <TextField
            multiline
            required
            rows={2}
            label={t('submissions.label')}
            id="comment-field"
            sx={{ mb: 2 }}
            {...register('comment')}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ textTransform: 'capitalize' }}
            isLoading={isSubmitEventLoading && latestSubmitEvent === 'comment'}
            disabled={isSubmitEventLoading || manualTaskEvents?.isLoading}
          >
            {t('common:actions.submit')}
          </LoadingButton>
        </Stack>
      </Stack>
    </>
  );
}
