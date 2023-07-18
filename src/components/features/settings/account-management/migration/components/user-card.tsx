import { AvatarFile } from '@/components/atoms/avatar-file';
import { WalletIconsTransition } from '@/components/atoms/wallet-icons-transition';
import { Protocol_Api_Auth, Users } from '@/services/hasura/types';
import { GatewaySxProps } from '@/theme';
import { limitCharsCentered } from '@/utils/string';
import { PartialDeep } from 'type-fest';

import CancelCircleIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Avatar, Chip, Stack, Typography, alpha } from '@mui/material';

type Props = {
  user: PartialDeep<Users>;
  auth: PartialDeep<Protocol_Api_Auth>;
  variant?: 'normal' | 'raised' | 'error' | 'sucess';
};

const themeSx: Record<Exclude<Props['variant'], 'normal'>, GatewaySxProps> = {
  raised: {
    borderColor: 'primary.main',
    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.16),
  },
  error: {
    borderColor: (theme) => alpha(theme.palette.error.main, 0.5),
    backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
  },
  sucess: {
    borderColor: (theme) => alpha(theme.palette.success.main, 0.5),
    backgroundColor: (theme) => alpha(theme.palette.success.main, 0.08),
  },
};

export function UserCard({ user, auth, variant = 'normal' }: Props) {
  const info = (
    <Stack direction="row" alignItems="center" gap={1.5}>
      <AvatarFile file={user.picture} />
      <Typography variant="body1">{user.username}</Typography>
    </Stack>
  );

  return (
    <Stack
      direction="column"
      gap={3}
      p={14 / 8}
      sx={{
        flex: 1,
        borderRadius: 2,
        backgroundColor: alpha('#fff', 0.05),
        border: '1px solid',
        borderColor: 'divider',
        ...themeSx[variant],
      }}
    >
      {variant === 'error' || variant === 'sucess' ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {info}
          {variant === 'error' ? (
            <CancelCircleIcon color="error" />
          ) : (
            <CheckCircleIcon color="success" />
          )}
        </Stack>
      ) : (
        info
      )}

      <Chip
        icon={
          <Avatar sizes="xs" sx={{ width: 24, height: 24 }}>
            <WalletIconsTransition network={auth.data?.chain} size={14} />
          </Avatar>
        }
        label={limitCharsCentered(auth.data?.address, 10)}
        sx={{ justifyContent: 'flex-start', alignSelf: 'flex-start' }}
      />
    </Stack>
  );
}
