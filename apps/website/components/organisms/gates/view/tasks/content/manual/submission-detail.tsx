import useTranslation from 'next-translate/useTranslation';

import { useToggle } from 'react-use';
import { PartialDeep } from 'type-fest/source/partial-deep';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Manual_Task_Events } from '../../../../../../../services/graphql/types.generated';
import { AvatarFile } from '../../../../../../atoms/avatar-file';
import { Accordion } from './components/accordion';
import { InterationList } from './components/interation-list';

type SubmissionDetailProps = {
  username: string;
  backButtonHandler: () => void;
};

export function SubmissionDetail({
  username,
  backButtonHandler,
}: SubmissionDetailProps) {
  const { t } = useTranslation('gate-profile');
  const [expanded, toggleExpanded] = useToggle(false);

  // MOCK
  const interations: PartialDeep<Manual_Task_Events>[] = [
    {
      issuer: {
        username: 'kbooz',
      },
      created_at: new Date().toISOString(),
      event_type: 'approve',
    },
    {
      issuer: {
        username: 'kbooz',
      },
      created_at: '2022-11-10T09:35:00.000-00:00',
      event_type: 'reject',
    },
    {
      issuer: {
        username: 'kbooz',
      },
      created_at: '2022-11-09T19:01:00.000-00:00',
      event_type: 'send_link',
    },
    {
      issuer: {
        username: 'h.st',
        name: 'Harisson Santos',
      },
      created_at: '2022-11-08T11:10:00.000-00:00',
      event_type: 'comment',
      data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum sodales ipsum eget molestie.',
    },
    {
      issuer: {
        username: 'kbooz',
      },
      created_at: '2022-11-07T19:23:00.000-00:00',
      event_type: 'send_link',
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
        <Stack direction="row" gap={1} alignItems="center">
          <IconButton
            sx={{
              p: 1,
              background: 'rgba(229, 229, 229, 0.16)',
            }}
            onClick={() => backButtonHandler()}
            key="arrow-left"
          >
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <AvatarFile file={null} fallback="/avatar.png"></AvatarFile>
          <Typography
            sx={{ flexGrow: 1, ml: 0.5 }}
          >{`@${username}`}</Typography>
        </Stack>
      </Accordion>
      <Stack
        sx={{
          width: '100%',
          borderRadius: '8px 8px 0 0',
          overflow: 'auto',
          py: expanded ? 2 : 0,
          height: expanded ? '700px' : 0,
          opacity: expanded ? 1 : 0,
          transition: 'all .3s ease',
        }}
      >
        <Stack sx={{ mx: 7.5 }}>
          <InterationList
            list={interations}
            elevation={20}
            gate={null}
            status="not_done"
          />
        </Stack>
        <Divider sx={{ width: '100%', mb: 5 }} />
        <TextField
          multiline
          required
          maxRows={3}
          label={t('submissions.label')}
          id="comment-field"
          sx={{ flexGrow: 1, mx: 7.5, mb: 3 }}
        />
      </Stack>
    </Stack>
  );
}
