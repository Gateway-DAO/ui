import useTranslation from 'next-translate/useTranslation';
import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useToggle } from 'react-use';
import { PartialDeep } from 'type-fest';

import { Stack } from '@mui/material';

import { useAuth } from '../../../../../../../providers/auth';
import {
  Tasks,
  Gates,
  Task_Progress,
} from '../../../../../../../services/graphql/types.generated';
import { ManualTaskEventType } from '../../../../../../../types/tasks';
import { Accordion } from './components/accordion';
import { SubmissionsDetailHeader } from './components/submissions-detail-header';
import { SubmissionsHeader } from './components/submissions-header';
import { SubmissionsList } from './components/submissions-list';
import { SubmissionDetail } from './submission-detail';

type Props = {
  gate: PartialDeep<Gates>;
  task: PartialDeep<Tasks>;
};

export function Submissions({ gate, task }: Props) {
  const { me, gqlAuthMethods } = useAuth();
  const { t } = useTranslation('gate-profile');
  const [expanded, toggleExpanded] = useToggle(false);
  const [detailedTaskProgressId, setDetailedTaskProgressId] =
    useState<string>();

  const snackbar = useSnackbar();

  const queryClient = useQueryClient();

  const onSubmitEvent = (event_type: ManualTaskEventType, data?: any) => {
    modifyTask.mutate({
      task_id: detailedTaskProgress.task_id,
      info: {
        event_type,
        data,
      },
    });
  };

  const manualTasksSubmissions = useQuery(
    ['admin-manual-task-submissions', gate.id, me.id],
    () => gqlAuthMethods.manual_tasks_progress({ gate_id: gate.id })
  );

  const tasksSubmissions: {
    pending: PartialDeep<Task_Progress>[];
    sent: PartialDeep<Task_Progress>[];
  } = useMemo(
    () =>
      manualTasksSubmissions.data?.task_progress.reduce(
        (acc, task_progress) => {
          if (
            task_progress.completed === 'in_review' ||
            task_progress.completed === 'not_done'
          ) {
            acc.pending.push(task_progress);
          } else {
            acc.sent.push(task_progress);
          }
          return acc;
        },
        {
          pending: [] as PartialDeep<Task_Progress>[],
          sent: [] as PartialDeep<Task_Progress>[],
        }
      ) ?? {
        pending: [],
        sent: [],
      },
    [manualTasksSubmissions.data?.task_progress]
  );

  const tasksInReview = tasksSubmissions.pending.filter(
    (task_progress) => task_progress.completed === 'in_review'
  );

  const amount =
    (tasksSubmissions.pending.length ?? 0) +
    (tasksSubmissions.sent.length ?? 0);

  const detailedTaskProgress = manualTasksSubmissions.data?.task_progress.find(
    (task_progress) => task_progress.id === detailedTaskProgressId
  );

  const modifyTask = useMutation(
    [
      'completeTask',
      { gateId: gate.id, taskId: detailedTaskProgress?.task_id },
    ],
    gqlAuthMethods.complete_task,
    {
      onSuccess: () => {
        queryClient.resetQueries(['gate', gate.id]);
        queryClient.resetQueries(['user_task_progresses', me?.id]);
        queryClient.resetQueries([
          'admin-manual-task-submissions',
          gate.id,
          me?.id,
        ]);
        queryClient.resetQueries([
          'manual-task-events',
          detailedTaskProgress?.id,
        ]);
      },
      onError: (error: any) => {
        snackbar.enqueueSnackbar(error?.response?.errors?.[0]?.message, {
          variant: 'error',
        });
      },
    }
  );

  return (
    <Stack
      sx={{
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.12) 100%), #10041C',
        width: { xs: '100%', lg: '56%' },
        maxHeight: '90%',
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 3,
        borderRadius: '8px 8px 0 0',
        border: '1px solid rgba(229, 229, 229, 0.12)',
      }}
    >
      <Accordion
        isEnabled={amount > 0}
        expanded={expanded}
        clickHandler={toggleExpanded}
      >
        {detailedTaskProgress ? (
          <SubmissionsDetailHeader
            progress={detailedTaskProgress}
            user={detailedTaskProgress.user}
            isSubmitEventLoading={modifyTask.isLoading}
            onBack={() => setDetailedTaskProgressId(undefined)}
            onSubmitEvent={onSubmitEvent}
          />
        ) : (
          <SubmissionsHeader
            isLoading={manualTasksSubmissions.isLoading}
            amount={amount}
            amountNew={tasksInReview?.length ?? 0}
          />
        )}
      </Accordion>
      <Stack
        sx={{
          width: '100%',
          borderRadius: '8px 8px 0 0',
          py: expanded ? 2 : 0,
          height: expanded ? 'auto' : 0,
          maxHeight: '100%',
          opacity: expanded ? 1 : 0,
          transition: 'all .3s ease',
        }}
      >
        {detailedTaskProgress ? (
          <SubmissionDetail
            progress={detailedTaskProgress}
            gate={gate}
            onSubmitEvent={onSubmitEvent}
            isSubmitEventLoading={modifyTask.isLoading}
          />
        ) : (
          <>
            {tasksSubmissions.pending?.length > 0 && (
              <SubmissionsList
                title={t('submissions.pending_feedback')}
                list={tasksSubmissions.pending}
                onSelect={setDetailedTaskProgressId}
              />
            )}
            {tasksSubmissions.sent?.length > 0 && (
              <SubmissionsList
                title={t('submissions.feeback_sent')}
                list={tasksSubmissions.sent}
                onSelect={setDetailedTaskProgressId}
              />
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
}
