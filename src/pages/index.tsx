import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { HeadContainer } from '@/components/molecules/head-container';
import { LandingTemplate } from '@/components/templates/landing';
import { OrgCreationProps } from '@/components/templates/landing/create-org/types';
import { FeaturedProps } from '@/components/templates/landing/featured/types';
import { FooterProps } from '@/components/templates/landing/footer/types';
import { InvestorProps } from '@/components/templates/landing/investors/types';
import { MenuListItem } from '@/components/templates/landing/menu/types';
import { ProductShowProps } from '@/components/templates/landing/product-show/types';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';

import { Button } from '@mui/material';

export default function Index() {
  const router = useRouter();
  const { onOpenLogin, isAuthenticated } = useAuth();
  const handleLogin = () => {
    if (isAuthenticated) {
      router.push(ROUTES.EXPLORE);
    } else {
      onOpenLogin();
    }
  };

  const { t } = useTranslation('index');
  const menuList = t('menu', null, { returnObjects: true }) as MenuListItem[];
  const forUsersContent = t('forUsers', null, {
    returnObjects: true,
  }) as FeaturedProps;
  const forOrganizationsContent = t('forOrganizations', null, {
    returnObjects: true,
  }) as FeaturedProps;
  const theGatewayContent = t('theGatewayContent', null, {
    returnObjects: true,
  }) as ProductShowProps;
  const buildAppsContent = t('buildAppsContent', null, {
    returnObjects: true,
  }) as ProductShowProps;
  const investorsContent = t('investorsContent', null, {
    returnObjects: true,
  }) as InvestorProps;
  const orgCreation = t('orgCreation', null, {
    returnObjects: true,
  }) as OrgCreationProps;
  const footerContent = t('footerContent', null, {
    returnObjects: true,
  }) as FooterProps;

  return (
    <>
      <HeadContainer ogImage="default" />
      <LandingTemplate
        signUpButton={
          <Button
            variant="contained"
            size="large"
            sx={{ whiteSpace: 'nowrap', height: '56px' }}
            onClick={handleLogin}
          >
            {t('signUp')}
          </Button>
        }
        theGatewayContent={theGatewayContent}
        buildAppsContent={buildAppsContent}
        forUsersContent={forUsersContent}
        forOrganizationsContent={forOrganizationsContent}
        investorsContent={investorsContent}
        orgCreation={orgCreation}
        footerContent={footerContent}
        connectButton={
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
        }
        title={t('title')}
        subtitle={t('subtitle')}
        menuList={menuList}
        titleDescription={t('titleDescription')}
        enterButton={
          <Button
            variant="contained"
            sx={{ height: '56px', marginTop: '38px' }}
            size="large"
            onClick={handleLogin}
          >
            {t('enterButtonTitle')}
          </Button>
        }
      />
    </>
  );
}
