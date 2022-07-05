import useTranslation from 'next-translate/useTranslation';

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

type Props = {
  onBack: () => void;
};

/* TODO: add line clamp */

export function Faq({ onBack }: Props) {
  const { t } = useTranslation('auth');
  return (
    <>
      <DialogTitle>{t('faq.title')}</DialogTitle>
      <DialogContent>
        <Typography>{t('faq.text')}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onBack} variant="contained" size="small" fullWidth>
          {t('common:actions.got-it')}
        </Button>
      </DialogActions>
    </>
  );
}
