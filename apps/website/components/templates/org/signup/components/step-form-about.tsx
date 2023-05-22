import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

type Props = {
  handleStep: (newValue: boolean) => void;
};

export default function StepFormAbout({ handleStep }: Props) {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-about.title')}
      description={t('step-about.description')}
    />
  );
}
