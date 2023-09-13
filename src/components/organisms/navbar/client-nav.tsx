import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';

import { NavBarAvatar } from './navbar-avatar';
import { NavBarNotifications } from './navbar-notifications/navbar-notifications';

export function ClientNav() {
  const { t } = useTranslation('common');
  const { me } = useAuth();
  const router = useRouter();
  const session = useSession();

  if (typeof window !== 'undefined' && me) {
    return (
      <>
        <NavBarNotifications />
        <NavBarAvatar />
      </>
    );
  }

  return (
    <Link passHref href={`${ROUTES.AUTHENTICATION}?redirect=${router.asPath}`}>
      <LoadingButton
        isLoading={session.status === 'loading'}
        variant="outlined"
        color="secondary"
      >
        {t('actions.connect-now')}
      </LoadingButton>
    </Link>
  );
}
