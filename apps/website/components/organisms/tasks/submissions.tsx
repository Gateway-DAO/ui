import useTranslation from 'next-translate/useTranslation';

import { useToggle } from 'react-use';

import { brandColors } from '@gateway/theme';

import { Stack, Typography, alpha } from '@mui/material';

import { InterationType } from '../gates/view/tasks/content/manual/components/task-interation';
import { SubmissionsHeader } from './submissions-header';
import { SubmissionsItem } from './submissions-item';

export function Submissions() {
  const { t } = useTranslation('gate-profile');
  const [expanded, toggleExpanded] = useToggle(false);

  // MOCK
  const username = 'kbooz';
  const datetime = '10/03/2022, 4:23 pm';
  const text = 'Submitted a link';
  const amount = 10;
  const amountNew = 4;
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
      <SubmissionsHeader
        amount={amount}
        amountNew={amountNew}
        expanded={expanded}
        clickHandler={toggleExpanded}
      />
      <Stack
        sx={{
          width: '100%',
          borderRadius: '8px 8px 0 0',
          overflow: 'auto',
          py: expanded ? 2 : 0,
          height: expanded ? '500px' : 0,
          opacity: expanded ? 1 : 0,
          transition: 'all .3s ease',
        }}
      >
        <Typography
          fontSize={12}
          sx={{
            textTransform: 'uppercase',
            color: `${alpha(brandColors.white.main, 0.7)}`,
            px: 7.5,
            mb: 1,
          }}
        >
          {t('submissions.pending_feedback')}
        </Typography>
        <Stack sx={{ mb: 4 }}>
          <SubmissionsItem
            username={username}
            datetime={datetime}
            text={text}
          />
          <SubmissionsItem
            username={username}
            datetime={datetime}
            text={text}
          />
          <SubmissionsItem
            username={username}
            datetime={datetime}
            text={text}
          />
          <SubmissionsItem
            username={username}
            datetime={datetime}
            text={text}
          />
          <SubmissionsItem
            username={username}
            datetime={datetime}
            text={text}
          />
        </Stack>
        <Typography
          fontSize={12}
          sx={{
            textTransform: 'uppercase',
            color: `${alpha(brandColors.white.main, 0.7)}`,
            px: 7.5,
            mb: 1,
          }}
        >
          {t('submissions.feeback_sent')}
        </Typography>
        <Stack sx={{ mb: 4 }}>
          <SubmissionsItem
            username={username}
            datetime={datetime}
            text={text}
            status={InterationType.APPROVED}
          />
          <SubmissionsItem
            username={username}
            datetime={datetime}
            text={text}
            status={InterationType.DENIED}
          />
          <SubmissionsItem
            username={username}
            datetime={datetime}
            text={text}
            status={InterationType.APPROVED}
          />
          <SubmissionsItem
            username={username}
            datetime={datetime}
            text={text}
            status={InterationType.DENIED}
          />
          <SubmissionsItem
            username={username}
            datetime={datetime}
            text={text}
            status={InterationType.DENIED}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
