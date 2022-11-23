import useTranslation from 'next-translate/useTranslation';

import { Stack, Typography } from '@mui/material';

import Bullet from './bullet';
import CommentCard from './comment-card';
import DocumentCard from './document-card';

type taskInterationProps = {
  firstItem?: boolean;
  type: InterationType;
  headerText: string;
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
  headerText,
  user,
}: taskInterationProps) => {
  const { t } = useTranslation('gate-profile');

  const isWaiting = type === InterationType.WAITING;
  const isComment = type === InterationType.COMMENT;
  const isFile = type === InterationType.LINK;

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
            color: isWaiting ? theme.palette.grey[500] : null,
          })}
        >
          {isWaiting ? headerText : `@${user}`}
        </Typography>
        <Typography
          fontSize={14}
          sx={(theme) => ({
            color: isWaiting ? null : theme.palette.grey[500],
          })}
        >
          {isWaiting ? `@${user}` : headerText}
        </Typography>
      </Stack>
      {isComment && (
        <CommentCard
          fullname={fullname}
          avatarFile={avatarFile}
          username={username}
          comment={comment}
        ></CommentCard>
      )}
      {isFile && (
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
