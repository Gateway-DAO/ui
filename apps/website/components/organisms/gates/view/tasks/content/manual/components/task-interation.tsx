import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest';

import { ISOToString } from '@gateway/helpers';

import { Stack, Typography } from '@mui/material';

import { Manual_Task_Events } from '../../../../../../../../services/graphql/types.generated';
import Bullet from './bullet';
import CommentCard from './comment-card';
import DocumentCard from './document-card';

export type TaskInterationProps = PartialDeep<Manual_Task_Events> & {
  firstItem?: boolean;
  elevation?: number;
};

export enum InterationType {
  COMMENT = 0,
  LINK = 1,
  APPROVED = 2,
  DENIED = 3,
  WAITING = 4,
}

const TaskInteration = ({
  event_type,
  created_at,
  issuer,
  data,
  firstItem = false,
  elevation = 1,
}: TaskInterationProps) => {
  const { t, lang } = useTranslation('gate-profile');
  const datetimeString =
    ISOToString(created_at, lang) == 'now'
      ? t('submissions.just_now')
      : ISOToString(created_at, lang);

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
      <Bullet type={event_type} />
      <Stack direction="row" gap={0.5} sx={{ marginTop: -0.5 }}>
        <Typography
          fontSize={14}
          sx={(theme) => ({
            color:
              event_type === InterationType.WAITING
                ? theme.palette.grey[500]
                : null,
          })}
        >
          {event_type === InterationType.WAITING
            ? `${t('submissions.waiting_feedback')}`
            : `@${issuer.username}`}
        </Typography>
        <Typography
          fontSize={14}
          sx={(theme) => ({
            color:
              event_type === InterationType.WAITING
                ? null
                : theme.palette.grey[500],
          })}
        >
          {event_type === InterationType.WAITING && `@${issuer.username}`}
          {event_type === InterationType.LINK &&
            `${t('submissions.submitted_link')} - ${datetimeString}`}
          {event_type === InterationType.COMMENT &&
            `${t('submissions.sent_comment')} - ${datetimeString}`}
          {event_type === InterationType.APPROVED &&
            `${t('submissions.approved_submission')} - ${datetimeString}`}
          {event_type === InterationType.DENIED &&
            `${t('submissions.denied_submission')} - ${datetimeString}`}
        </Typography>
      </Stack>
      {event_type === InterationType.COMMENT && (
        <CommentCard
          fullname={issuer.name}
          avatarFile={issuer.picture}
          username={issuer.username}
          comment={data}
          elevation={elevation}
        ></CommentCard>
      )}
      {event_type === InterationType.LINK && (
        <DocumentCard
          docTitle={data}
          docUrl={data}
          docText={data}
          elevation={elevation}
        ></DocumentCard>
      )}
    </Stack>
  );
};

export default TaskInteration;
