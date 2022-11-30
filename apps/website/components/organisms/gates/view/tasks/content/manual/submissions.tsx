import useTranslation from 'next-translate/useTranslation';

import { useToggle } from 'react-use';

import { Stack } from '@mui/material';

import { Accordion } from './components/accordion';
import { SubmissionsHeader } from './components/submissions-header';
import { SubmissionsItemProps } from './components/submissions-item';
import { SubmissionsList } from './components/submissions-list';
import { InterationType } from './components/task-interation';

export function Submissions() {
  const { t } = useTranslation('gate-profile');
  const [expanded, toggleExpanded] = useToggle(false);

  // MOCK
  const amount = 10;
  const amountNew = 4;
  const pendingFeedbackList: SubmissionsItemProps[] = [
    {
      username: 'kbooz',
      datetime: new Date().toISOString(),
      type: InterationType.LINK,
    },
    {
      username: 'kbooz',
      datetime: '2022-11-09T16:23:00.000-00:00',
      type: InterationType.COMMENT,
      approver: 'h.st',
    },
    {
      username: 'kbooz',
      datetime: '2022-11-09T19:23:00.000-00:00',
      type: InterationType.LINK,
    },
  ];
  const feedbackSentList: SubmissionsItemProps[] = [
    {
      username: 'kbooz',
      datetime: '2022-11-10T16:23:00.000-00:00',
      type: InterationType.DENIED,
      approver: 'h.st',
    },
    {
      username: 'kbooz',
      datetime: '2022-11-10T20:23:00.000-00:00',
      type: InterationType.APPROVED,
      approver: 'h.st',
    },
    {
      username: 'kbooz',
      datetime: '2022-11-09T16:00:00.000-00:00',
      type: InterationType.DENIED,
      approver: 'h.st',
    },
    {
      username: 'kbooz',
      datetime: '2022-11-10T11:20:00.000-00:00',
      type: InterationType.APPROVED,
      approver: 'h.st',
    },
  ];
  // MOCK - END

  return (
    <Stack
      sx={{
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.12) 100%), #10041C',
        width: '56%',
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
        <SubmissionsHeader amount={amount} amountNew={amountNew} />
      </Accordion>
      <Stack
        sx={{
          width: '100%',
          borderRadius: '8px 8px 0 0',
          overflow: 'auto',
          py: expanded ? 2 : 0,
          height: expanded ? '500px' : 0,
          maxHeight: '100%',
          opacity: expanded ? 1 : 0,
          transition: 'all .3s ease',
        }}
      >
        <SubmissionsList
          title={t('submissions.pending_feedback')}
          list={pendingFeedbackList}
        />
        <SubmissionsList
          title={t('submissions.feeback_sent')}
          list={feedbackSentList}
        />
      </Stack>
    </Stack>
  );
}
