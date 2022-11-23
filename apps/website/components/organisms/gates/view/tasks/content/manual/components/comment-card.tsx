import { PartialObjectDeep } from 'type-fest/source/partial-deep';

import { Paper, Stack, Typography } from '@mui/material';

import { AvatarFile } from '../../../../../../../../components/atoms/avatar-file';
import { Files } from '../../../../../../../../services/graphql/types.generated';

type commentCardProps = {
  fullname?: string;
  avatarFile?: PartialObjectDeep<Files>;
  username?: string;
  comment: string;
};

const CommentCard = ({
  fullname,
  avatarFile,
  username,
  comment,
}: commentCardProps) => {
  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 1,
        mt: 2,
        p: 2,
        width: '100%',
      }}
    >
      <Stack direction="row" gap={2} sx={{ mb: 2 }}>
        <AvatarFile file={avatarFile} fallback="/avatar.png">
          {username}
        </AvatarFile>
        <Stack sx={{ flexGrow: 1 }}>
          {fullname && (
            <Typography
              fontSize={14}
              sx={(theme) => ({
                color: theme.palette.grey[300],
              })}
            >
              {fullname}
            </Typography>
          )}
          {username && (
            <Typography
              fontSize={14}
              sx={(theme) => ({
                color: theme.palette.grey[500],
              })}
            >
              {`@${username}`}
            </Typography>
          )}
        </Stack>
      </Stack>
      <Typography
        title={comment}
        sx={(theme) => ({
          color: theme.palette.grey[300],
          maxHeight: '50px',
          overflow: 'hidden',
        })}
      >
        {comment}
      </Typography>
    </Paper>
  );
};

export default CommentCard;
