import useTranslation from 'next-translate/useTranslation';
import { useContext, useMemo } from 'react';

import { WalletIconsTransition } from '@/components/atoms/wallet-icons-transition';
import { useAuth } from '@/providers/auth';
import { useFormContext } from 'react-hook-form';
import { FaDiscord } from 'react-icons/fa';

import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';

import { EmailSignUpProgress } from '../utlis';
import { NewUserSchema } from '../utlis/schema';

export function SignUpMethods() {
  const { t } = useTranslation('dashboard-new-user');
  const { setSignUpSteps } = useContext(EmailSignUpProgress);
  const { onOpenLogin } = useAuth();
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<NewUserSchema>();

  async function onClick(e) {
    const isValid = await trigger('email_address');
    if (isValid) setSignUpSteps(1);
  }

  const orSignUpMethods = useMemo(() => {
    return [
      {
        methodName: 'Connect Wallet',
        icon: <WalletIconsTransition />,
        onClick: onOpenLogin,
      },
      {
        methodName: 'Continue with Google',
        icon: <GoogleIcon />,
        onClick: () => null,
      },
      {
        methodName: 'Continue with Twitter',
        icon: <TwitterIcon />,
        onClick: () => null,
      },
      {
        methodName: 'Continue with Discord',
        icon: <FaDiscord />,
        onClick: () => null,
      },
    ];
  }, []);

  return (
    <>
      <Stack gap={2} direction={'column'}>
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          {t('form.signup-methods.title')}
        </Typography>
        <Box>
          <Typography component="h2" variant="h6" fontSize={16}>
            {t('form.signup-methods.title-send-email')}
          </Typography>
          <Typography component="p" variant="caption">
            {t('form.signup-methods.caption-send-email')}
          </Typography>
        </Box>
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

        <Button
          variant="contained"
          sx={{ mt: 2, height: 48 }}
          onClick={onClick}
        >
          {t('form.signup-methods.btn')}
        </Button>
      </Stack>
      <Typography
        alignSelf={'center'}
        textTransform={'uppercase'}
        color="text.secondary"
      >
        or
      </Typography>
      <Stack gap={2.5}>
        {orSignUpMethods.map((method) => (
          <Button
            id={method.methodName}
            key={method.methodName}
            variant="outlined"
            size="large"
            color="secondary"
            startIcon={method.icon}
            fullWidth
            sx={{
              '& .MuiButton-startIcon	': {
                position: 'absolute',
                left: '1rem',
              },
            }}
            onClick={method.onClick}
          >
            {method.methodName}
          </Button>
        ))}
      </Stack>
      <Typography color="text.secondary">
        By continuing you agree to our{' '}
        <Link href="/terms" underline="none">
          Terms of Service{' '}
        </Link>
      </Typography>
    </>
  );
}
