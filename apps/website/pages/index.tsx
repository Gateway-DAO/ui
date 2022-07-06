import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { Button } from '@mui/material';

import { LandingTemplate } from '../components/templates/landing';
import { MenuListItem } from '../components/templates/landing/menu/types';

export default function Index() {
  const { t } = useTranslation('index');
  const menuList = t('menu', null, { returnObjects: true }) as MenuListItem[];

  return (
    <>
      <LandingTemplate
        connectButton={
          <Link passHref href="/home">
            <Button variant="contained">{t('openApp')}</Button>
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
