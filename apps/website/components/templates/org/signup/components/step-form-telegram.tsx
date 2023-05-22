import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

type Props = {
  handleStep: (newValue: boolean) => void;
};

export default function StepFormTelegram({ handleStep }: Props) {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-telegram.title')}
      description={t('step-telegram.description')}
    />
  );
}
