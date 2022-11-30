import useTranslation from 'next-translate/useTranslation';

import { PartialObjectDeep } from 'type-fest/source/partial-deep';

import { ISOToString } from '@gateway/helpers';

import { Stack, Typography } from '@mui/material';

import { Files } from '../../../../../../../../services/graphql/types.generated';
import Bullet from './bullet';
import CommentCard from './comment-card';
import DocumentCard from './document-card';

export type TaskInterationProps = {
  firstItem?: boolean;
  type: InterationType;
  datetime?: string;
  username: string;
  avatarFile?: PartialObjectDeep<Files>;
  fullname?: string;
  comment?: string;
  docTitle?: string;
  docText?: string;
  docUrl?: string;
  elevation?: number;
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
  username,
  avatarFile,
  fullname,
  comment,
  docTitle,
  docText,
  docUrl,
  elevation = 1,
}: TaskInterationProps) => {
  const { t, lang } = useTranslation('gate-profile');
  const datetimeString =
    ISOToString(datetime, lang) == 'now'
      ? t('submissions.just_now')
      : ISOToString(datetime, lang);

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
            : `@${username}`}
        </Typography>
        <Typography
          fontSize={14}
          sx={(theme) => ({
            color:
              type === InterationType.WAITING ? null : theme.palette.grey[500],
          })}
        >
          {type === InterationType.WAITING && `@${username}`}
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
          elevation={elevation}
        ></CommentCard>
      )}
      {type === InterationType.LINK && (
        <DocumentCard
          docTitle={docTitle}
          docUrl={docUrl}
          docText={docText}
          elevation={elevation}
        ></DocumentCard>
      )}
    </Stack>
  );
};

export default TaskInteration;
