import useTranslation from 'next-translate/useTranslation';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { CircularProgress, Divider, Stack, TextField } from '@mui/material';

import { useAuth } from '../../../../../../../providers/auth';
import {
  Task_Progress,
  Gates,
} from '../../../../../../../services/graphql/types.generated';
import { LoadingButton } from '../../../../../../atoms/loading-button';
import { InterationList } from './components/interation-list';

export type SubmissionDetailProps = {
  gate: PartialDeep<Gates>;
  progress: PartialDeep<Task_Progress>;
};

export function SubmissionDetail({ progress, gate }: SubmissionDetailProps) {
  const { gqlAuthMethods } = useAuth();
  const { t } = useTranslation('gate-profile');

  const manualTaskEvents = useQuery(['manual-task-events', progress.id], () =>
    gqlAuthMethods.manual_task_events({
      task_progress_id: progress.id,
    })
  );

  if (manualTaskEvents.isLoading) {
    return <CircularProgress sx={{ alignSelf: 'center', my: 10 }} />;
  }

  return (
    <>
      <Stack sx={{ px: 7.5, maxHeight: '400px', overflow: 'auto' }}>
        <InterationList
          list={[
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
            ...manualTaskEvents.data.manual_task_events,
          ]}
          elevation={20}
          gate={gate}
          status={progress.completed}
        />
      </Stack>
      <Stack>
        <Divider sx={{ width: '100%', mb: 5 }} />
        <Stack sx={{ px: 7.5, mb: 3 }}>
          <TextField
            multiline
            required
            maxRows={3}
            label={t('submissions.label')}
            id="comment-field"
            sx={{ mb: 2 }}
          />
          <LoadingButton variant="contained">Submit</LoadingButton>
        </Stack>
      </Stack>
    </>
  );
}
