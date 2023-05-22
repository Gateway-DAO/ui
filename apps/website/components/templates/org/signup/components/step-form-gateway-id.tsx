import useTranslation from 'next-translate/useTranslation';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { TextField } from '@mui/material';

import { GatewayIdSchema, gatewayIdSchema } from '../schema';
import StepFormHeader from './step-form-header';

type Props = {
  handleStep: (newValue: boolean) => void;
};

export default function StepFormGatewayId({ handleStep }: Props) {
  const methods = useForm<GatewayIdSchema>({
    resolver: yupResolver(gatewayIdSchema),
    mode: 'all',
  });
  const { t } = useTranslation('org-signup');
  const { register, formState } = methods;
  return (
    <FormProvider {...methods}>
      <StepFormHeader
        title={t('step-gateway-id.title')}
        description={t('step-gateway-id.description')}
      />
      <TextField
        required
        label={t('step-gateway-id.label')}
        type="text"
        id="org_gateway_id"
        {...register('gatewayId')}
        error={!!formState?.errors?.gatewayId}
        helperText={formState?.errors.gatewayId?.message}
      />
    </FormProvider>
  );
}
