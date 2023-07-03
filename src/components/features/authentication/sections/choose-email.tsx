import useTranslation from 'next-translate/useTranslation';

import { useFormContext } from 'react-hook-form';

import { Stack, Typography } from '@mui/material';

import { Email } from '../components/email';
import { TitleSubtitleField } from '../components/title-field';
import { EmailSchema } from '../schema';
import { useSignupEmail } from '../use-signup-email';

export function ChooseEmail() {
  const { t } = useTranslation('authentication');

  const { signupEmailMutation, onSuccessMutation } = useSignupEmail();

  const { handleSubmit } = useFormContext<EmailSchema>();

  const onSubmitEmail = (data: EmailSchema) => signupEmailMutation.mutate(data);

  return (
    <Stack
      component="form"
      gap={2}
      direction={'column'}
      onSubmit={handleSubmit(onSubmitEmail)}
    >
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {t('form.authentications.title')}
      </Typography>
      <TitleSubtitleField
        title={t('form.authentications.title-send-email')}
        subtitle={t('form.authentications.caption-send-email')}
      />
      <Email />
    </Stack>
  );
}
