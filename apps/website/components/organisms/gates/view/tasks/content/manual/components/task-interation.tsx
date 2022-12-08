import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest';

import { ISOToString } from '@gateway/helpers';

import { Stack, Typography } from '@mui/material';

import { Manual_Task_Events } from '../../../../../../../../services/graphql/types.generated';
import Bullet from './bullet';
import CommentCard from './comment-card';
import LinkPreviewCard from './link-preview-card';

export type TaskInterationProps = PartialDeep<Manual_Task_Events> & {
  lastItem?: boolean;
  elevation?: number;
};

const TaskInteration = ({
  event_type,
  created_at,
  issuer,
  data,
  lastItem = false,
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
        borderLeft: !lastItem ? `1px solid ${theme.palette.grey[700]}` : 'none',
      })}
    >
      <Bullet event_type={event_type} />
      <Stack direction="row" gap={0.5} sx={{ marginTop: -0.5 }}>
        <Typography fontSize={14}>{`@${issuer.username}`}</Typography>
        <Typography
          fontSize={14}
          sx={(theme) => ({
            color: theme.palette.grey[500],
          })}
        >
          {event_type === 'send_link' &&
            `${t('submissions.submitted_link')} - ${datetimeString}`}
          {event_type === 'comment' &&
            `${t('submissions.sent_comment')} - ${datetimeString}`}
          {event_type === 'approve' &&
            `${t('submissions.approved_submission')} - ${datetimeString}`}
          {event_type === 'reject' &&
            `${t('submissions.denied_submission')} - ${datetimeString}`}
        </Typography>
      </Stack>
      {event_type === 'comment' && (
        <CommentCard
          fullname={issuer.name}
          avatarFile={issuer.picture}
          username={issuer.username}
          comment={data}
          elevation={elevation}
        ></CommentCard>
      )}
      {event_type === 'send_link' && (
        <LinkPreviewCard {...data} elevation={elevation}></LinkPreviewCard>
      )}
    </Stack>
  );
};

export default TaskInteration;
