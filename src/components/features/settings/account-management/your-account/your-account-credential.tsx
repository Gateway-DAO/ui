import useTranslation from 'next-translate/useTranslation';

import { TitleSubtitleField } from '@/components/atoms/title-field';

import { CredentialIdentityCard } from './credential-identity-card';

export function YourAccountCredential() {
  const { t } = useTranslation('settings');

  return (
    <>
      <TitleSubtitleField
        title={t('nav.account-credential-title')}
        subtitle={t('nav.account-credential-caption')}
      />
      <CredentialIdentityCard />
    </>
  );
}
