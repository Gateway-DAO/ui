import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useToggle } from 'react-use';
import { PartialDeep } from 'type-fest';

import { Stack } from '@mui/material';

import { useAuth } from '../../../../../../../providers/auth';
import {
  Tasks,
  Gates,
  Task_Progress,
  Manual_Task_Events,
} from '../../../../../../../services/graphql/types.generated';
import { Accordion } from './components/accordion';
import { SubmissionsDetailHeader } from './components/submissions-detail-header';
import { SubmissionsHeader } from './components/submissions-header';
import { SubmissionsList } from './components/submissions-list';

type Props = {
  gate: PartialDeep<Gates>;
  task: PartialDeep<Tasks>;
};

export function Submissions({ gate, task }: Props) {
  const { me, gqlAuthMethods } = useAuth();
  const { t } = useTranslation('gate-profile');
  const [expanded, toggleExpanded] = useToggle(false);
  const [detailedSubmission, setDetailedSubmission] = useState<{
    event: PartialDeep<Manual_Task_Events>;
    progress: PartialDeep<Task_Progress>;
  }>();

  const manualTasksSubmissions = useQuery(
    ['admin-manual-task-submissions', gate.id, me.id],
    () => gqlAuthMethods.manual_tasks_progress({ gate_id: gate.id }),
    {
      select: (data) =>
        data.task_progress.reduce(
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
        ),
    }
  );

  const tasksInReview = manualTasksSubmissions.data?.pending.filter(
    (task_progress) => task_progress.completed === 'in_review'
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
      <Accordion expanded={expanded} clickHandler={toggleExpanded}>
        {detailedSubmission ? (
          <SubmissionsDetailHeader
            user={detailedSubmission.progress.user}
            onBack={() => setDetailedSubmission(undefined)}
          />
        ) : (
          <SubmissionsHeader
            amount={
              manualTasksSubmissions.data?.pending.length ??
              0 + manualTasksSubmissions.data?.sent.length ??
              0
            }
            amountNew={tasksInReview?.length ?? 0}
          />
        )}
      </Accordion>
      <Stack
        sx={{
          width: '100%',
          borderRadius: '8px 8px 0 0',
          overflow: 'auto',
          py: expanded ? 2 : 0,
          height: expanded ? '700px' : 0,
          maxHeight: '100%',
          opacity: expanded ? 1 : 0,
          transition: 'all .3s ease',
        }}
      >
        {manualTasksSubmissions.data?.pending?.length > 0 && (
          <SubmissionsList
            title={t('submissions.pending_feedback')}
            list={manualTasksSubmissions.data.pending}
            onSelect={(event, progress) => {
              setDetailedSubmission({ event, progress });
            }}
          />
        )}
        {manualTasksSubmissions.data?.sent?.length > 0 && (
          <SubmissionsList
            title={t('submissions.feeback_sent')}
            list={manualTasksSubmissions.data.sent}
            onSelect={(event, progress) => {
              setDetailedSubmission({ event, progress });
            }}
          />
        )}
      </Stack>
    </Stack>
  );
}
