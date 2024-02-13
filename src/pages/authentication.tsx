import useTranslation from 'next-translate/useTranslation';

import { Authentication } from '@/components/features/authentication/authentication';
import { SignUpProvider } from '@/components/features/authentication/signup-context';
import { HeadContainer } from '@/components/molecules/head-container';
import { AuthenticationTemplate } from '@/components/templates/authentication/authentication-template';

export default function AuthenticationPage() {
  const { t } = useTranslation('authentication');

  return (
    <>
      <HeadContainer title={t('steps.initial.title')} />
      <SignUpProvider>
        <AuthenticationTemplate>
          <Authentication />
        </AuthenticationTemplate>
      </SignUpProvider>
    </>
  );
}