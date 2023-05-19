import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { theme } from '@/theme';
import { useIntersection } from 'react-use';

import { Box, Button } from '@mui/material';

import { HeadContainer } from '../components/molecules/head-container';
import TermsOfService from '../components/molecules/terms-of-service';
import { Footer } from '../components/templates/landing/footer';
import { FooterProps } from '../components/templates/landing/footer/types';
import { Menu } from '../components/templates/landing/menu/menu';
import { MenuListItem } from '../components/templates/landing/menu/types';
import { DEFAULT_PADDINGX } from '../components/templates/landing/styles';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';

export default function Terms() {
  const { t } = useTranslation('index');
  const router = useRouter();
  const { onOpenLogin, authenticated } = useAuth();
  const handleLogin = () => {
    if (authenticated) {
      router.push(ROUTES.EXPLORE);
    } else {
      onOpenLogin();
    }
  };

  const menuList = t('menu', null, { returnObjects: true }) as MenuListItem[];
  const [activeArea, setActiveArea] = useState('');

  const signUpButton: ReactNode = (
    <Button
      variant="contained"
      size="large"
      sx={{ whiteSpace: 'nowrap', height: '56px' }}
      onClick={handleLogin}
    >
      {t('signUp')}
    </Button>
  );

  const connectButton: ReactNode = (
    <Link passHref href="/explore">
      <Button
        variant="outlined"
        size="large"
        sx={(theme) => ({
          whiteSpace: 'nowrap',
          height: '56px',
          [theme.breakpoints.down('sm')]: {
            height: '30px',
            width: 'auto',
            maxWidth: '95px',
          },
        })}
      >
        {t('openApp')}
      </Button>
    </Link>
  );
  const menuProps = { menuList, signUpButton, connectButton };
  const footerContent = t('footerContent', null, {
    returnObjects: true,
  }) as FooterProps;
  return (
    <>
      <HeadContainer ogImage="default" />
      <Menu {...menuProps} activeMenu={activeArea} />
      <Box
        sx={(theme) => ({
          px: DEFAULT_PADDINGX,
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          [theme.breakpoints.down('sm')]: {
            px: '20px',
          },
        })}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1150px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TermsOfService />
          <Footer {...footerContent} />
        </Box>
      </Box>
    </>
  );
}
