import useTranslation from 'next-translate/useTranslation';

import StepFormHeader from './step-form-header';

export default function StepFormGatewayId() {
  const { t } = useTranslation('org-signup');

  return (
    <StepFormHeader
      title={t('step-gateway-id.title')}
      description={t('step-gateway-id.description')}
    />
  );
}
