import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { useSignupEmail } from '@/hooks/use-signup-email';
import { useFormContext } from 'react-hook-form';

import { Stack, Typography } from '@mui/material';

import { Email } from '../components/email';
import { TitleSubtitleField } from '../components/title-field';
import { EmailSchema } from '../schema';

type Props = {
  navigateStep: (step: number) => void;
};

export function ChooseEmail({ navigateStep }: Props) {
  const { t } = useTranslation('authentication');

  const { signupEmailMutation, onSuccessMutation } = useSignupEmail();

  const { handleSubmit } = useFormContext<EmailSchema>();

  useEffect(() => {
    navigateStep(2);
  }, [onSuccessMutation]);

  const onSubmitEmail = (data: EmailSchema) => signupEmailMutation.mutate(data);

  return (
    <Stack
      component="form"
      gap={2}
      direction={'column'}
      onSubmit={handleSubmit(onSubmitEmail)}
    >
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {t('form.signup-methods.title')}
      </Typography>
      <TitleSubtitleField
        title={t('form.signup-methods.title-send-email')}
        subtitle={t('form.signup-methods.caption-send-email')}
      />
      <Email navigateStep={navigateStep} />
    </Stack>
  );
}
