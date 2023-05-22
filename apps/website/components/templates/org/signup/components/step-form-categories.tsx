import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

type Props = {
  handleStep: (newValue: boolean) => void;
};

export default function StepFormCategories({ handleStep }: Props) {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-categories.title')}
      description={t('step-categories.description')}
    />
  );
}
