import useTranslation from 'next-translate/useTranslation';
import { Fragment, useMemo } from 'react';

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
        id: 'wallet',
        methodName: t('steps.initial.connect-wallet'),
        icon: <WalletIconsTransition />,
        onClick: onOpenLogin,
        isVisible: true,
      },
      {
        id: 'google',
        methodName: t('steps.initial.connect-google'),
        icon: <GoogleIcon />,
        onClick: () => null,
        isVisible: false,
      },
      {
        id: 'twitter',
        methodName: t('steps.initial.connect-twitter'),
        icon: <TwitterIcon />,
        onClick: () => null,
        isVisible: false,
      },
      {
        id: 'discord',
        methodName: t('steps.initial.connect-discord'),
        icon: <FaDiscord />,
        onClick: () => null,
        isVisible: false,
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
        {t('steps.initial.or')}
      </Typography>
      <Stack gap={2.5}>
        {orSignUpMethods
          .filter((method) => method.isVisible)
          .map((method) => (
            <Fragment key={method.id}>
              <Button
                id={method.methodName}
                key={method.methodName}
                variant="outlined"
                size="large"
                color="secondary"
                startIcon={method.icon}
                fullWidth
                sx={{
                  height: 48,
                  '& .MuiButton-startIcon	': {
                    position: 'absolute',
                    left: '1rem',
                  },
                }}
                onClick={method.onClick}
              >
                {method.methodName}
              </Button>
            </Fragment>
          ))}
      </Stack>
      <Typography color="text.secondary" variant="caption">
        {t('steps.initial.terms-info')}{' '}
        <Link href="/terms" underline="none">
          {t('steps.initial.terms-of-service')}{' '}
        </Link>
      </Typography>
    </>
  );
}
