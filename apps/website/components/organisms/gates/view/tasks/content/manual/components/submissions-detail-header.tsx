import { PartialDeep } from 'type-fest';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Stack, Typography } from '@mui/material';

import { Users } from '../../../../../../../../services/graphql/types.generated';
import { AvatarFile } from '../../../../../../../atoms/avatar-file';

type Props = {
  user: PartialDeep<Users>;
  onBack: () => void;
};

export function SubmissionsDetailHeader({ onBack, user }: Props) {
  return (
    <Stack direction="row" gap={1} alignItems="center">
      <IconButton
        sx={{
          p: 1,
          background: 'rgba(229, 229, 229, 0.16)',
        }}
        onClick={onBack}
        key="arrow-left"
      >
        <ArrowBackIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <AvatarFile file={user.picture} fallback="/avatar.png"></AvatarFile>
      <Typography
        sx={{ flexGrow: 1, ml: 0.5 }}
      >{`@${user.username}`}</Typography>
    </Stack>
  );
}
