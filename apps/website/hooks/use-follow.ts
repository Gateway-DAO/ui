import { useMutation, queryClient } from '@tanstack/react-query';

import { useAuth } from '../providers/auth';
import { useProtected } from './use-protected';

export type UseFollowProps = {
  onFollow?: (id?: string) => void;
  onUnfollow?: (id?: string) => void;
};

export const useFollowUser = (cb?: UseFollowProps) => {
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
        cb?.onFollow(follow_user.user_id);
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
        cb?.onUnfollow(unfollow_user.user_id);
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

export const useFollowDAO = (cb?: UseFollowProps) => {
  const { me, gqlAuthMethods, onUpdateMe } = useAuth();

  const follow = useMutation(
    (id: string) => gqlAuthMethods.follow_dao({ id }),
    {
      async onSuccess({ follow_dao }) {
        // onUpdateMe((oldMe) => ({
        //   ...oldMe,
        //   following_dao: oldMe.following_dao
        //     ? [...oldMe.following_dao, follow_dao]
        //     : [follow_dao],
        // }));
        await queryClient.refetchQueries(['me', address]);
        cb?.onFollow(follow_dao.dao_id);
      },
    }
  );

  const unfollow = useMutation(
    (id: string) => gqlAuthMethods.unfollow_dao({ id }),
    {
      async onSuccess({ unfollow_dao }) {
        // onUpdateMe((oldMe) => ({
        //   ...oldMe,
        //   following_dao: oldMe.following_dao.filter(
        //     ({ dao }) => dao.id !== unfollow_dao.dao_id
        //   ),
        // }));
        await queryClient.refetchQueries(['me', address]);
        cb?.onUnfollow(unfollow_dao.dao_id);
      },
    }
  );

  const isLoading = (id: string) =>
    (follow.isLoading && follow.variables === id) ||
    (unfollow.isLoading && unfollow.variables === id);

  const isFollowingDAO = (id: string) =>
    me?.following_dao?.find(({ dao_id }) => dao_id === id) ?? false;

  const onToggleFollow = useProtected((id: string, isFollowing?: boolean) => {
    if (isFollowing) return unfollow.mutate(id);
    return follow.mutate(id);
  });

  const onFollowDAO = useProtected((id: string) => {
    follow.mutate(id);
  });

  const onUnfollowDAO = useProtected((id: string) => {
    unfollow.mutate(id);
  });

  return {
    onFollowDAO,
    onUnfollowDAO,
    onToggleFollow,
    isFollowingDAO,
    isLoading,
  };
};
