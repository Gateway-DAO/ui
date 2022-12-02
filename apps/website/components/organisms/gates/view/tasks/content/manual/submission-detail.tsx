import useTranslation from 'next-translate/useTranslation';

import { useToggle } from 'react-use';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { AvatarFile } from '../../../../../../atoms/avatar-file';
import { Accordion } from './components/accordion';
import { InterationList } from './components/interation-list';
import {
  InterationType,
  TaskInterationProps,
} from './components/task-interation';

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
  const interations: TaskInterationProps[] = [
    {
      username: 'kbooz',
      datetime: new Date().toISOString(),
      type: InterationType.APPROVED,
    },
    {
      username: 'kbooz',
      datetime: '2022-11-10T09:35:00.000-00:00',
      type: InterationType.DENIED,
    },
    {
      username: 'kbooz',
      datetime: '2022-11-10T05:12:00.000-00:00',
      type: InterationType.WAITING,
    },
    {
      username: 'kbooz',
      datetime: '2022-11-09T19:01:00.000-00:00',
      type: InterationType.LINK,
      docTitle: 'Title of Page',
      docUrl: 'docs.google.com',
      docText:
        "Other hits by Coolio, who won a Grammy for 'Gangsta`s Paradise' in the mid-1990s, included “Fantastic Voyage”",
    },
    {
      username: 'h.st',
      fullname: 'Harisson Santos',
      datetime: '2022-11-08T11:10:00.000-00:00',
      type: InterationType.COMMENT,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum sodales ipsum eget molestie.',
    },
    {
      username: 'kbooz',
      datetime: '2022-11-07T19:23:00.000-00:00',
      type: InterationType.LINK,
      docTitle: 'Title of Page',
      docUrl: 'docs.google.com',
      docText:
        "Other hits by Coolio, who won a Grammy for 'Gangsta`s Paradise' in the mid-1990s, included “Fantastic Voyage”",
      firstItem: true,
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
          <InterationList list={interations} elevation={20} />
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
