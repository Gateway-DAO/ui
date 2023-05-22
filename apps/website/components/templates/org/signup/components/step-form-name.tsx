import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

export default function StepFormName() {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-name.title')}
      description={t('step-name.description')}
    />
  );
}
