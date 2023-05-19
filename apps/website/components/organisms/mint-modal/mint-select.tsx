import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useConnect } from 'wagmi';

import { theme } from 'apps/website/theme';

import { ChevronRight } from '@mui/icons-material';
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Badge,
  Typography,
} from '@mui/material';

import { networks } from './mint-modal';

type Props = {
  onSubmit: () => void;
  onCancel: () => void;
};

export function MintSelect({ onSubmit, onCancel }: Props) {
  const { isSuccess } = useConnect();

  const { t } = useTranslation('auth');

  useEffect(() => {
    if (isSuccess) {
      onSubmit();
    }
  }, [isSuccess, onSubmit]);

  return (
    <>
      <DialogTitle sx={{ pb: 0.5 }}>Mint as NFT</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ pb: 1 }} color="text.secondary">
          Choose the Network
        </Typography>
        <List>
          {Object.keys(networks).map((network) => (
            <ListItem key={uuidv4()}>
              <ListItemAvatar>
                <Badge
                  color="success"
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  sx={{
                    '& .MuiBadge-badge': {
                      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                      '&::after': {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      },
                    },
                  }}
                >
                  <Avatar src={networks[network].png} />
                </Badge>
              </ListItemAvatar>
              <ListItemText primary={networks[network].name} secondary="Cost" />
              <ListItemSecondaryAction>
                <IconButton>
                  <ChevronRight />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions sx={{ paddingBottom: '24px' }}>
        <Button onClick={onCancel} variant="outlined" size="small" fullWidth>
          {t('common:actions.cancel')}
        </Button>
      </DialogActions>
    </>
  );
}
