import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { Button } from '@mui/material';

import { LandingTemplate } from '../components/templates/landing';

export default function Index() {
  const { t } = useTranslation('index');

  return (
    <>
      <LandingTemplate
        connectButton={
          <Link passHref href="/home">
            <Button variant="contained">Open App</Button>
          </Link>
        }
        title={t('title')}
        subtitle={t('subtitle')}
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
