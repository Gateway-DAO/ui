import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Signup } from '@/components/features/signup';
import { HeadContainer } from '@/components/molecules/head-container';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';

export default function NewUser() {
  const { me } = useAuth();
  const router = useRouter();
  const { t } = useTranslation('dashboard-new-user');
  useEffect(() => {
    if (me?.init && me?.protocol?.isCompleted) {
      router.replace((router.query?.callback as string) ?? ROUTES.EXPLORE);
    }
  }, [me?.init, router]);

  return (
    <>
      <HeadContainer title={t('title-send-email')} />
      <Signup />
    </>
  );
}

NewUser.auth = true;
