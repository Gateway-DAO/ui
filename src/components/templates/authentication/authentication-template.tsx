import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  type AuthStep,
  useSignUpContext,
} from '@/components/features/authentication/signup-context';
import { ROUTES } from '@/constants/routes';
import { theme } from '@/theme';

import CloseIcon from '@mui/icons-material/Close';
import { alpha, Avatar, Box, Stack } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export function AuthenticationTemplate({ children }: Props) {
  const { t } = useTranslation('authentication');
  const router = useRouter();
  const {
    state: { step },
  } = useSignUpContext();
  const canShowClose = (
    ['initial', 'code-verification'] as AuthStep[]
  ).includes(step);

  return (
    <Stack
      sx={{
        backgroundImage: 'url(/images/signup-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '100%',
      }}
    >
      {canShowClose && (
        <Link
          passHref
          href={(router?.query?.redirect as string) ?? ROUTES.EXPLORE}
        >
          <Avatar
            component="a"
            sx={{
              width: 40,
              height: 40,
              alignSelf: 'center',
              position: 'absolute',
              top: { xs: 10, md: 38 },
              right: { xs: 20, md: 48 },
              zIndex: 1,
              cursor: 'pointer',
            }}
          >
            <CloseIcon />
          </Avatar>
        </Link>
      )}
      <Stack
        gap={2}
        sx={{
          maxWidth: { xs: '100%', md: '50%', lg: '582px' },
          width: '100%',
          backdropFilter: 'blur(25px)',
          px: { xs: 2, md: 6 },
          justifyContent: 'center',
          height: '100%',
          background: alpha(theme.palette.common.black, 0.03),
          borderRight: '1px solid rgba(229, 229, 229, 0.12)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 20, md: 48 },
            left: { xs: 20, md: 48 },
          }}
        >
          <img
            src="/favicon-192.png"
            alt={t('logo-alternative-text')}
            width="30"
          />
        </Box>
        {children}
      </Stack>
    </Stack>
  );
}
