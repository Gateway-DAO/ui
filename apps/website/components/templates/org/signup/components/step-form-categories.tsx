import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

export default function StepFormCategories() {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-categories.title')}
      description={t('step-categories.description')}
    />
  );
}
