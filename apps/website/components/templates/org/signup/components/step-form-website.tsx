import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

export default function StepFormWebsite() {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-website.title')}
      description={t('step-website.description')}
    />
  );
}
