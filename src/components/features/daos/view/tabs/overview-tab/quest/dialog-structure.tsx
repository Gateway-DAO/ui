import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Dialog } from '@mui/material';
import { SlideUp } from '@/components/atoms/transitions/transitions';
import { HeadContainer } from '@/components/molecules/head-container';
import { CreateQuestTemplate } from './create-quest';

export default function CreateQuestDialog({
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
      router.push({ hash: 'create-quest' });
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      TransitionComponent={SlideUp}
      fullScreen
      scroll="body"
      sx={{ ' .MuiDialog-paper': { backgroundImage: 'none' } }}
    >
      <HeadContainer title={t('page-title')} description={'page-description'} />
      <CreateQuestTemplate closeDialog={() => closeDialog()} />
    </Dialog>
  );
}
