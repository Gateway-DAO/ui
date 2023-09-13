import { AvatarFile } from '@/components/atoms/avatar-file';
import { WalletIconsTransition } from '@/components/atoms/wallet-icons-transition';
import {
  Protocol_Api_Auth,
  Protocol_Api_AuthType,
  Protocol_Api_Chain,
  Users,
} from '@/services/hasura/types';
import { GatewaySxProps } from '@/theme';
import { limitCharsCentered } from '@/utils/string';
import { PartialDeep } from 'type-fest';

import CancelCircleIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Avatar, Chip, Stack, Typography, alpha } from '@mui/material';

import { LoadingAuth, LoadingUser } from '../skeletons';

type Props = {
  user: PartialDeep<Users>;
  auth: PartialDeep<Protocol_Api_Auth>;
  variant?: 'normal' | 'raised' | 'error' | 'sucess';
  isLoading?: boolean;
  isLoadingAuth?: boolean;
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

const WalletChip = ({
  address,
  chain,
}: {
  address: string;
  chain: Protocol_Api_Chain;
}) => (
  <Chip
    icon={
      <Avatar sizes="xs" sx={{ width: 24, height: 24 }}>
        <WalletIconsTransition network={chain} size={14} />
      </Avatar>
    }
    label={limitCharsCentered(address, 10)}
    sx={{ justifyContent: 'flex-start', alignSelf: 'flex-start' }}
  />
);

const EmailChip = ({ email }: { email: string }) => (
  <Chip
    icon={
      <Avatar sizes="xs" sx={{ width: 24, height: 24, fontSize: 14 }}>
        @
      </Avatar>
    }
    label={limitCharsCentered(email, 10)}
    sx={{ justifyContent: 'flex-start', alignSelf: 'flex-start' }}
  />
);

export function UserCard({
  user,
  auth,
  variant = 'normal',
  isLoading,
  isLoadingAuth,
}: Props) {
  const info = user ? (
    <Stack direction="row" alignItems="center" gap={1.5}>
      <AvatarFile file={user.picture} />
      <Typography variant="body1">{user.username}</Typography>
    </Stack>
  ) : undefined;

  const header =
    variant === 'error' || variant === 'sucess' ? (
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {info}
        {variant === 'error' ? (
          <CancelCircleIcon color="error" />
        ) : (
          <CheckCircleIcon color="success" />
        )}
      </Stack>
    ) : (
      info
    );

  const chip = auth ? (
    <>
      {auth.type === Protocol_Api_AuthType.Email && (
        <EmailChip {...auth.data} />
      )}
      {auth.type === Protocol_Api_AuthType.Wallet && (
        <WalletChip {...auth.data} />
      )}
    </>
  ) : undefined;

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
      {isLoading ? <LoadingUser /> : header}

      {isLoading || isLoadingAuth ? <LoadingAuth /> : chip}
    </Stack>
  );
}
