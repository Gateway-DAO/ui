import useTranslation from 'next-translate/useTranslation';

import { useQuery } from 'react-query';

import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogTitle,
  List,
} from '@mui/material';

import { gqlAnonMethods } from '../../../../services/api';
import { UsersList } from './users';

type Props = {
  wallet: string;
  connections: string[];
  onClose: () => void;
};

export function ConnectionsModal({ wallet, connections, onClose }: Props) {
  const { t } = useTranslation('user-profile');

  const { isLoading, isSuccess, data } = useQuery(
    ['cyberconnect-wallets', 'gateway-users', wallet],
    () => gqlAnonMethods.users_by_wallets({ wallets: connections })
  );

  /* Mock an array of users, create an array of 100 identical users */
  const users = data?.users || [];

  return (
    <>
      <DialogTitle>{t('connections-modal.title')}</DialogTitle>
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {isSuccess && <UsersList users={users} />}
      <DialogActions sx={{ pt: 2 }}>
        <Button onClick={onClose} variant="contained" fullWidth>
          {t('common:actions.close')}
        </Button>
      </DialogActions>
    </>
  );
}
