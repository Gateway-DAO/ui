import useTranslation from 'next-translate/useTranslation';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { PartialDeep } from 'type-fest';

import { CircularProgress, Divider, Stack, TextField } from '@mui/material';

import { useAuth } from '../../../../../../../providers/auth';
import {
  Task_Progress,
  Gates,
} from '../../../../../../../services/graphql/types.generated';
import { ManualTaskEventType } from '../../../../../../../types/tasks';
import { LoadingButton } from '../../../../../../atoms/loading-button';
import { InterationList } from './components/interation-list';

export type SubmissionDetailProps = {
  gate: PartialDeep<Gates>;
  progress: PartialDeep<Task_Progress>;
  isSubmitEventLoading: boolean;
  latestSubmitEvent?: ManualTaskEventType;
  onSubmitEvent: (event_type: ManualTaskEventType, data: any) => void;
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
  const { handleSubmit, register } = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const manualTaskEvents = useQuery(['manual-task-events', progress.id], () =>
    gqlAuthMethods.manual_task_events({
      task_progress_id: progress.id,
    })
  );

  const onSubmit = handleSubmit(async (data) => {
    if (manualTaskEvents.isLoading) return;
    onSubmitEvent('comment', data);
  });

  return (
    <>
      {manualTaskEvents.isLoading ? (
        <CircularProgress sx={{ alignSelf: 'center', my: 10 }} />
      ) : (
        <Stack sx={{ px: 7.5, maxHeight: '400px', overflow: 'auto' }}>
          <InterationList
            list={manualTaskEvents.data.manual_task_events}
            elevation={20}
            gate={gate}
            status={progress.completed}
          />
        </Stack>
      )}
      <Stack component="form" onSubmit={onSubmit}>
        <Divider sx={{ width: '100%', mb: 5 }} />
        <Stack sx={{ px: 7.5, mb: 3 }}>
          <TextField
            multiline
            required
            maxRows={3}
            label={t('submissions.label')}
            id="comment-field"
            sx={{ mb: 2 }}
            {...register('comment')}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            isLoading={isSubmitEventLoading && latestSubmitEvent === 'comment'}
            disabled={isSubmitEventLoading || manualTaskEvents.isLoading}
          >
            Submit
          </LoadingButton>
        </Stack>
      </Stack>
    </>
  );
}
