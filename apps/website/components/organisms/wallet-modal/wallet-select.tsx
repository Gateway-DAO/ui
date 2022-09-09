import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { colord } from 'colord';
import { useConnect } from 'wagmi';

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  Typography,
} from '@mui/material';

import { icons } from './wallet-modal';

type Props = {
  onFaq: () => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function WalletSelect({ onFaq, onSubmit, onCancel }: Props) {
  const { connectors, data, isSuccess, connectAsync } = useConnect();

  const { t } = useTranslation('auth');

  const connect = async (connector) => {
    await connectAsync({ connector });
    onSubmit();
  };

  useEffect(() => {
    if (isSuccess) {
      onSubmit();
    }
  }, [isSuccess, onSubmit]);

  return (
    <>
      <DialogTitle sx={{ pb: 0.5 }}>{t('select-wallet.title')}</DialogTitle>
      <DialogContent>
        <Typography color="secondary.dark" sx={{ pb: 2 }}>
          {t('select-wallet.description') + ' '}
          <Link
            sx={{
              cursor: 'pointer',
            }}
            underline="hover"
            onClick={onFaq}
          >
            {t('select-wallet.help')}
          </Link>
        </Typography>
        <Typography variant="subtitle1" sx={{ pb: 1 }}>
          {t('select-wallet.choose-wallet')}
        </Typography>
        <Stack display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1}>
          {connectors.map((connector) => {
            const isActive = connector.id === data?.connector?.id;
            return (
              <Button
                key={connector.id}
                variant="outlined"
                color="primary"
                sx={{
                  display: 'flex',
                  flexFlow: 'column',
                  backgroundColor: isActive
                    ? (theme) =>
                        colord(theme.palette.primary.main)
                          .alpha(0.09)
                          .toRgbString()
                    : undefined,
                  borderRadius: 1,
                  borderColor: isActive ? 'primary.main' : 'divider',
                  gap: 6 / 16,
                  py: 4,
                  px: 2,
                }}
                onClick={() => connect(connector)}
              >
                {icons[connector.id]}
                <Typography
                  component="span"
                  variant="inherit"
                  color="text.secondary"
                >
                  {connector.name}
                </Typography>
              </Button>
            );
          })}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ paddingBottom: '24px' }}>
        <Button onClick={onCancel} variant="outlined" size="small" fullWidth>
          {t('common:actions.cancel')}
        </Button>
      </DialogActions>
    </>
  );
}
