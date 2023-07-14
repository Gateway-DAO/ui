import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

export default function StepCreateProfile() {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-create-profile.title')}
      description={t('step-create-profile.description')}
    />
  );
}
