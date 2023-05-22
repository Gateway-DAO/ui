import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

export default function StepFormRole() {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-role.title')}
      description={t('step-role.description')}
    />
  );
}
