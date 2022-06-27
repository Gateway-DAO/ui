import useTranslation from 'next-translate/useTranslation';

import { colord } from 'colord';
import { useConnect } from 'wagmi';

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  const { connect, connectors, activeConnector, isConnected } = useConnect();

  const { t } = useTranslation('auth');

  return (
    <>
      <DialogTitle sx={{ pb: 0.5 }}>{t('select-wallet.title')}</DialogTitle>
      <DialogContent>
        <Typography color="secondary.dark" sx={{ pb: 2 }}>
          {t('select-wallet.description')}
          <Button
            sx={{ textTransform: 'none', fontWeight: 500, fontSize: 16, py: 0 }}
            onClick={onFaq}
          >
            {t('select-wallet.help')}
          </Button>
        </Typography>
        <Typography variant="subtitle1" sx={{ pb: 1 }}>
          {t('select-wallet.choose-wallet')}
        </Typography>
        <Stack display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1}>
          {connectors.map((x) => {
            const isActive = x.id === activeConnector?.id;
            return (
              <Button
                key={x.id}
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
                onClick={() => connect(x)}
              >
                {icons[x.id]}
                <Typography
                  component="span"
                  variant="button"
                  color="text.primary"
                >
                  {x.name}
                </Typography>
              </Button>
            );
          })}
        </Stack>
      </DialogContent>
      <DialogActions>
        {isConnected ? (
          <Button onClick={onSubmit} variant="contained" size="small" fullWidth>
            {t('common:actions.connect')}
          </Button>
        ) : (
          <Button
            disabled={isConnected}
            onClick={onCancel}
            variant="outlined"
            size="small"
            fullWidth
          >
            {t('common:actions.cancel')}
          </Button>
        )}
      </DialogActions>

      {/* {error && <div>{error.message}</div>} */}
    </>
  );
}
