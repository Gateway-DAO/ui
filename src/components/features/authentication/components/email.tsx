import useTranslation from 'next-translate/useTranslation';

import { useSignupEmail } from '@/hooks/use-signup-email';

import { Button, TextField } from '@mui/material';

type Props = {
  navigateStep: (step: number) => void;
};

export function Email({ navigateStep }: Props) {
  const { t } = useTranslation('authentication');

  const { methodsEmail } = useSignupEmail();

  async function onClick(e) {
    const isValid = await methodsEmail?.formState?.isValid;
    if (isValid) navigateStep(1);
  }

  return (
    <>
      <TextField
        required
        label={t('form.fields.e-mail')}
        type="email"
        id="email_address"
        {...methodsEmail?.register('email_address')}
        error={!!methodsEmail?.formState?.errors}
        helperText={
          (methodsEmail?.formState?.errors?.email_address?.message ??
            t('form.fields.e-mail-helper-text')) as string
        }
      />

      <Button variant="contained" sx={{ mt: 2, height: 48 }} onClick={onClick}>
        {t('form.signup-methods.btn')}
      </Button>
    </>
  );
}
