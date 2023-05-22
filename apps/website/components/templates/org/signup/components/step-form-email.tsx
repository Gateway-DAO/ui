import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

export default function StepFormEmail() {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-email.title')}
      description={t('step-email.description')}
    />
  );
}
