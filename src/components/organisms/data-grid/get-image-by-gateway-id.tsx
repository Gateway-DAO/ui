import { useAuth } from '@/providers/auth';
import { useQuery } from '@tanstack/react-query';
import { AvatarFile } from '@/components/atoms/avatar-file';

export function GetImage({ username }) {
  const { hasuraUserService } = useAuth();
  const {
    data: {
      users: [user],
    },
  } = useQuery(['user', username], () =>
    hasuraUserService.get_user_by_username({
      username: username as string,
    })
  );

  return (
    <AvatarFile
      sx={{ width: 24, height: 24 }}
      file={user.picture}
      fallback={'/images/avatar-default.png'}
    />
  );
}
