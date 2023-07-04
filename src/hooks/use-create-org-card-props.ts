import { useAuth } from '@/providers/auth';

type Props = {
  action: () => void;
};

export function useCreateOrgCardProps({ action }: Props) {
  const { me } = useAuth();

  return {
    ...(me
      ? {
          component: 'button',
          onClick: action,
        }
      : {
          component: 'a',
          href: '/login',
        }),
  };
}
