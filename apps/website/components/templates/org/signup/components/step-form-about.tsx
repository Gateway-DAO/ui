import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

export default function StepFormAbout() {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-about.title')}
      description={t('step-about.description')}
    />
  );
}
