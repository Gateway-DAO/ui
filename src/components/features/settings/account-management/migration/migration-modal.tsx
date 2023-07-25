import Trans from 'next-translate/Trans';
import TransText from 'next-translate/TransText';
import useTranslation from 'next-translate/useTranslation';

import { ArrowDivider } from '@/components/atoms/arrow-divider';
import { ConfirmDelete } from '@/components/organisms/confirm-delete/confirm-delete';
import { useAuth } from '@/providers/auth';
import { hasuraApi } from '@/services/hasura/api';
import { Protocol_Api_AuthType } from '@/services/hasura/types';
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { Divider, Stack, Typography } from '@mui/material';

import { UserCard } from './components/user-card';
import { ModalContentSkeleton } from './skeletons';

export type MigrationModalData = {
  token: string;
  hasura_id: string;
  type: Protocol_Api_AuthType;
  data: any;
};

type Props = {
  onClose: () => void;
  data: MigrationModalData;
};

export function MigrationModal({
  onClose,
  data: { token, hasura_id, type: authType, data: authData },
}: Props) {
  const { me } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('settings');

  const { isLoading, data: oldUser } = useQuery(
    ['migration', hasura_id],
    () => hasuraApi(token, hasura_id).migration_authentication_user(),
    {
      select: (res) => res.me,
    }
  );

  const { authentications } = oldUser?.protocolUser ?? {};
  const auth = authentications?.find((item) => {
    if (item.type !== authType) return;
    switch (authType) {
      case Protocol_Api_AuthType.Email:
        return item.data.email === authData;
      case Protocol_Api_AuthType.Wallet:
        return item.data.address === authData.address;
      default:
        return false;
    }
  });

  if ((!isLoading && !auth) || (!isLoading && !oldUser)) {
    enqueueSnackbar('Authentication not found. Please contact support.', {
      variant: 'error',
    });
    onClose();
  }
  const remainingAuthenticaiton =
    authentications?.filter((item) => item.id !== auth.id) ?? [];
  const isMigrating = remainingAuthenticaiton.length === 0;

  return (
    <>
      <Stack
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 0 },
          mt: 2,
        }}
      >
        <UserCard
          user={oldUser}
          auth={auth}
          isLoading={isLoading}
          variant={isMigrating ? 'error' : 'normal'}
        />
        <ArrowDivider />
        <UserCard
          user={me}
          auth={auth}
          isLoadingAuth={isLoading}
          variant={isMigrating ? 'sucess' : 'raised'}
        />
      </Stack>
      <Divider sx={{ my: 4 }} />

      {isLoading ? (
        <ModalContentSkeleton />
      ) : (
        <>
          <Typography fontWeight={600} sx={{ mb: 3 }}>
            {t('settings:account-management.modal-migration.qa.title')}
          </Typography>
          <Stack direction="column" divider={<Divider />}>
            <Typography sx={{ py: 2 }}>
              <Trans
                i18nKey="settings:account-management.modal-migration.qa.description"
                components={[<b key="b" />]}
                values={{ username: me.username }}
              />
            </Typography>
            {isMigrating ? (
              <Typography
                key="id-will-deactivated"
                sx={{ py: 2 }}
                color="error"
              >
                <Trans
                  i18nKey="settings:account-management.modal-migration.qa.user-deactivated"
                  components={[<b key="b" />]}
                  values={{ username: me.username }}
                />
              </Typography>
            ) : (
              [
                <Typography key="wont-be-deactivated" sx={{ py: 2 }}>
                  <Trans
                    i18nKey="settings:account-management.modal-migration.qa.user-keep-alive"
                    components={[<b key="b" />]}
                    values={{ username: me.username }}
                  />
                </Typography>,
                <Typography key="wont-connect" sx={{ py: 2 }}>
                  <Trans
                    i18nKey="settings:account-management.modal-migration.qa.wont-connect"
                    components={[<b key="b" />]}
                    values={{ username: me.username }}
                  />
                </Typography>,
              ]
            )}
            <Typography key="undo" sx={{ py: 2 }} color="error">
              {t('settings:account-management.modal-migration.qa.cant-undo')}
            </Typography>
          </Stack>
          <Divider sx={{ mt: 4 }} />
          <ConfirmDelete
            {...(isMigrating
              ? {
                  buttonText: t(
                    'settings:account-management.modal-migration.migrate.title'
                  ),
                  checkText: t(
                    'settings:account-management.modal-migration.migrate.description'
                  ),
                  textKey: t(
                    'settings:account-management.modal-migration.migrate.confirm'
                  ),
                }
              : {
                  buttonText: t(
                    'settings:account-management.modal-migration.migrate-deactivate.title'
                  ),
                  checkText: t(
                    'settings:account-management.modal-migration.migrate-deactivate.description'
                  ),
                  textKey: t(
                    'settings:account-management.modal-migration.migrate-deactivate.confirm'
                  ),
                })}
            onCancel={onClose}
            onConfirm={() => {}}
          />
        </>
      )}
    </>
  );
}
