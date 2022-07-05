import { useMutation } from 'react-query';

import { useAuth } from '../providers/auth';
import { useProtected } from './use-protected';

export const useFollowUser = () => {
  const { me, gqlAuthMethods, onUpdateMe } = useAuth();

  const follow = useMutation(
    (id: string) => gqlAuthMethods.follow_user({ id }),
    {
      onSuccess({ follow_user }) {
        onUpdateMe((oldMe) => ({
          ...oldMe,
          following: oldMe.following
            ? [...oldMe.following, follow_user]
            : [follow_user],
        }));
      },
    }
  );

  const unfollow = useMutation(
    (id: string) => gqlAuthMethods.unfollow_user({ id }),
    {
      onSuccess({ unfollow_user }) {
        onUpdateMe((oldMe) => ({
          ...oldMe,
          following: oldMe.following.filter(
            ({ user_id }) => user_id !== unfollow_user.user_id
          ),
        }));
      },
    }
  );

  const isLoading = (id: string) =>
    (follow.isLoading && follow.variables === id) ||
    (unfollow.isLoading && unfollow.variables === id);

  const isFollowingUser = (id: string) =>
    me?.following?.find(({ user_id }) => user_id === id) ?? false;

  const onToggleFollow = useProtected((id: string, isFollowing?: boolean) => {
    if (isFollowing) return unfollow.mutate(id);
    return follow.mutate(id);
  });

  const onFollowUser = useProtected((id: string) => {
    follow.mutate(id);
  });

  const onUnfollowUser = useProtected((id: string) => {
    unfollow.mutate(id);
  });

  return {
    onFollowUser,
    onUnfollowUser,
    onToggleFollow,
    isFollowingUser,
    isLoading,
  };
};
