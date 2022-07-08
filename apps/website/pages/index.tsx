import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { Button } from '@mui/material';

import { LandingTemplate } from '../components/templates/landing';
import { FeaturedProps } from '../components/templates/landing/featured/types';
import { MenuListItem } from '../components/templates/landing/menu/types';

export default function Index() {
  const { t } = useTranslation('index');
  const menuList = t('menu', null, { returnObjects: true }) as MenuListItem[];
  const forUsersContent = t('forUsers', null, {
    returnObjects: true,
  }) as FeaturedProps;
  const forOrganizationsContent = t('forOrganizations', null, {
    returnObjects: true,
  }) as FeaturedProps;

  return (
    <>
      <LandingTemplate
        signUpButton={
          <Link passHref href="/home">
            <Button variant="contained" size="large">
              {t('signUp')}
            </Button>
          </Link>
        }
        forUsersContent={forUsersContent}
        forOrganizationsContent={forOrganizationsContent}
        connectButton={
          <Link passHref href="/home">
            <Button
              variant="outlined"
              size="large"
              sx={{ whiteSpace: 'nowrap' }}
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
