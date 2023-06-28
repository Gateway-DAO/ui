import useTranslation from 'next-translate/useTranslation';

import { Signup } from '@/components/features/signup';
import { HeadContainer } from '@/components/molecules/head-container';

export default function NewUser() {
  const { t } = useTranslation('signin');

  return (
    <>
      <HeadContainer title={t('form.signup-methods.title')} />
      <Signup />
    </>
  );
}
