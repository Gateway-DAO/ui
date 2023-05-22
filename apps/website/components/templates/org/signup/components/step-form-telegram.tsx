import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

export default function StepFormTelegram() {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-telegram.title')}
      description={t('step-telegram.description')}
    />
  );
}
