import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { WalletIconsTransition } from '@/components/atoms/wallet-icons-transition';
import { useAuth } from '@/providers/auth';
import { FaDiscord } from 'react-icons/fa';

import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button, Link, Stack, Typography } from '@mui/material';

export function AuthenticationOptions() {
  const { t } = useTranslation('authentication');
  const { onOpenLogin } = useAuth();

  const orSignUpMethods = useMemo(() => {
    return [
      {
        methodName: t('form.signup-methods.connect-wallet'),
        icon: <WalletIconsTransition />,
        onClick: onOpenLogin,
      },
      {
        methodName: t('form.signup-methods.connect-google'),
        icon: <GoogleIcon />,
        onClick: () => null,
      },
      {
        methodName: t('form.signup-methods.connect-twitter'),
        icon: <TwitterIcon />,
        onClick: () => null,
      },
      {
        methodName: t('form.signup-methods.connect-discord'),
        icon: <FaDiscord />,
        onClick: () => null,
      },
    ];
  }, []);

  return (
    <>
      <Typography
        alignSelf={'center'}
        textTransform={'uppercase'}
        color="text.secondary"
      >
        {t('form.signup-methods.or')}
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
        {t('form.signup-methods.terms-info')}{' '}
        <Link href="/terms" underline="none">
          {t('form.signup-methods.terms-of-service')}{' '}
        </Link>
      </Typography>
    </>
  );
}
