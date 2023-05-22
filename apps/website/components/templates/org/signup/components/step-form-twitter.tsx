import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

export default function StepFormTwitter() {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-twitter.title')}
      description={t('step-twitter.description')}
    />
  );
}
