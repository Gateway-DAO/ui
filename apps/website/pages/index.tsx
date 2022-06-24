import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { Button } from '@mui/material';

import { LandingTemplate } from '../components/templates/landing';

export default function Index() {
  const { t } = useTranslation('index');

  return (
    <>
      <LandingTemplate
        title={t('title')}
        connectButton={
          <Link passHref href="/home">
            <Button variant="contained">Open App</Button>
          </Link>
        }
      />
    </>
  );
}
