import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Dialog } from '@mui/material';

import { SlideUp } from '../../../atoms/transitions/transitions';
import { HeadContainer } from '../../../molecules/head-container';
import { OrgSignUpTemplate } from './signup';

export default function OrgSignupDialog({
  open,
  toggleDialog,
}: {
  open: boolean;
  toggleDialog: (value: boolean) => void;
}) {
  const { t } = useTranslation('org-signup');
  const router = useRouter();

  const closeDialog = () => {
    toggleDialog(false);
    router.push({ hash: '' });
  };

  useEffect(() => {
    if (open) {
      router.push({ hash: 'org-signup' });
    }
  }, [open]);

  return (
    <Dialog open={open} TransitionComponent={SlideUp} fullScreen>
      <HeadContainer title={t('page-title')} description={'page-description'} />
      <OrgSignUpTemplate closeDialog={() => closeDialog()} />
    </Dialog>
  );
}
