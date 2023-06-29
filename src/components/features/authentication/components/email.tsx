import useTranslation from 'next-translate/useTranslation';

import { useFormContext } from 'react-hook-form';

import { Button, TextField } from '@mui/material';

import { EmailSchema } from '../schema';

type Props = {
  navigateStep: (step: number) => void;
};

export function Email({ navigateStep }: Props) {
  const { t } = useTranslation('authentication');
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<EmailSchema>();

  async function onClick(e) {
    const isValid = await trigger('email_address');
    if (isValid) navigateStep(1);
  }

  return (
    <>
      <TextField
        required
        label={t('form.fields.e-mail')}
        type="email"
        id="email_address"
        {...register('email_address')}
        error={!!errors.email_address}
        helperText={
          (errors.email_address?.message ??
            t('form.fields.e-mail-helper-text')) as string
        }
      />

      <Button variant="contained" sx={{ mt: 2, height: 48 }} onClick={onClick}>
        {t('form.signup-methods.btn')}
      </Button>
    </>
  );
}
