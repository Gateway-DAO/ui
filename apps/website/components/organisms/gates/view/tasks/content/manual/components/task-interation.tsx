import useTranslation from 'next-translate/useTranslation';

import { ISOToString } from '@gateway/helpers';

import { Stack, Typography } from '@mui/material';

import Bullet from './bullet';
import CommentCard from './comment-card';
import DocumentCard from './document-card';

type taskInterationProps = {
  firstItem?: boolean;
  type: InterationType;
  datetime?: string;
  user: string;
};

export enum InterationType {
  WAITING = 0,
  COMMENT = 1,
  LINK = 2,
  APPROVED = 3,
  DENIED = 4,
}

const TaskInteration = ({
  firstItem = false,
  type,
  datetime,
  user,
}: taskInterationProps) => {
  const { t, lang } = useTranslation('gate-profile');
  const datetimeString = ISOToString(datetime, lang);

  // MOCK
  const docTitle = 'Title of Page';
  const docUrl = 'docs.google.com';
  const docText =
    "Other hits by Coolio, who won a Grammy for 'Gangsta`s Paradise' in the mid-1990s, included “Fantastic Voyage”";
  const fullname = 'Harisson Santos';
  const avatarFile = null;
  const username = 'h.st';
  const comment =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum sodales ipsum eget molestie.';
  // MOCK - END

  return (
    <Stack
      sx={(theme) => ({
        position: 'relative',
        pl: 3,
        pb: 4,
        width: '100%',
        borderLeft: !firstItem
          ? `1px solid ${theme.palette.grey[700]}`
          : 'none',
      })}
    >
      <Bullet type={type} />
      <Stack direction="row" gap={0.5} sx={{ marginTop: -0.5 }}>
        <Typography
          fontSize={14}
          sx={(theme) => ({
            color:
              type === InterationType.WAITING ? theme.palette.grey[500] : null,
          })}
        >
          {type === InterationType.WAITING
            ? `${t('submissions.waiting_feedback')}`
            : `@${user}`}
        </Typography>
        <Typography
          fontSize={14}
          sx={(theme) => ({
            color:
              type === InterationType.WAITING ? null : theme.palette.grey[500],
          })}
        >
          {type === InterationType.WAITING && `@${user}`}
          {type === InterationType.LINK &&
            `${t('submissions.submitted_link')} - ${datetimeString}`}
          {type === InterationType.COMMENT &&
            `${t('submissions.sent_comment')} - ${datetimeString}`}
          {type === InterationType.APPROVED &&
            `${t('submissions.approved_submission')} - ${datetimeString}`}
          {type === InterationType.DENIED &&
            `${t('submissions.denied_submission')} - ${datetimeString}`}
        </Typography>
      </Stack>
      {type === InterationType.COMMENT && (
        <CommentCard
          fullname={fullname}
          avatarFile={avatarFile}
          username={username}
          comment={comment}
        ></CommentCard>
      )}
      {type === InterationType.LINK && (
        <DocumentCard
          docTitle={docTitle}
          docUrl={docUrl}
          docText={docText}
        ></DocumentCard>
      )}
    </Stack>
  );
};

export default TaskInteration;
