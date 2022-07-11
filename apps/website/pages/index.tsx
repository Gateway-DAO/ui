import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { Button } from '@mui/material';

import { LandingTemplate } from '../components/templates/landing';
import { FeaturedProps } from '../components/templates/landing/featured/types';
import { MenuListItem } from '../components/templates/landing/menu/types';
import { ProductShowProps } from '../components/templates/landing/product-show/types';

export default function Index() {
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

  return (
    <>
      <LandingTemplate
        signUpButton={
          <Link passHref href="/home">
            <Button
              variant="contained"
              size="large"
              sx={{ whiteSpace: 'nowrap', height: '56px' }}
            >
              {t('signUp')}
            </Button>
          </Link>
        }
        theGatewayContent={theGatewayContent}
        buildAppsContent={buildAppsContent}
        forUsersContent={forUsersContent}
        forOrganizationsContent={forOrganizationsContent}
        connectButton={
          <Link passHref href="/home">
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
          <Link passHref href="/home">
            <Button
              variant="contained"
              sx={{ height: '56px', marginTop: '38px' }}
              size="large"
            >
              {t('enterButtonTitle')}
            </Button>
          </Link>
        }
      />
    </>
  );
}
