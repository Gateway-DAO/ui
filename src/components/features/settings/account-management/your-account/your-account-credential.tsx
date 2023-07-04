import useTranslation from 'next-translate/useTranslation';

import { TitleSubtitleField } from '@/components/atoms/title-field';
import { useAuth } from '@/providers/auth';

import { CredentialIdentityCard } from './credential-identity-card';

export function YourAccountCredential() {
  const { t } = useTranslation('settings');
  const { me } = useAuth();

  return (
    <>
      <TitleSubtitleField
        title={t('nav.account-credential-title')}
        subtitle={t('nav.account-credential-caption')}
      />
      <CredentialIdentityCard
        username={me?.protocolUser?.gatewayId ?? ''}
        id={me?.protocolUser?.id ?? ''}
        status="valid"
      />
    </>
  );
}
