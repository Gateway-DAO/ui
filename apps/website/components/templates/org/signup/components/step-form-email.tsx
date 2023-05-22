import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

type Props = {
  handleStep: (newValue: boolean) => void;
};

export default function StepFormEmail({ handleStep }: Props) {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-email.title')}
      description={t('step-email.description')}
    />
  );
}
