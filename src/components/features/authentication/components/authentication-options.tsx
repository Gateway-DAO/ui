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
        methodName: t('form.authentications.connect-wallet'),
        icon: <WalletIconsTransition />,
        onClick: onOpenLogin,
      },
      {
        methodName: t('form.authentications.connect-google'),
        icon: <GoogleIcon />,
        onClick: () => null,
      },
      {
        methodName: t('form.authentications.connect-twitter'),
        icon: <TwitterIcon />,
        onClick: () => null,
      },
      {
        methodName: t('form.authentications.connect-discord'),
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
        {t('form.authentications.or')}
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
        {t('form.authentications.terms-info')}{' '}
        <Link href="/terms" underline="none">
          {t('form.authentications.terms-of-service')}{' '}
        </Link>
      </Typography>
    </>
  );
}
