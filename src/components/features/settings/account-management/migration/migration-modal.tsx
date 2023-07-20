import { ArrowDivider } from '@/components/atoms/arrow-divider';
import { ConfirmDelete } from '@/components/organisms/confirm-delete/confirm-delete';
import { useAuth } from '@/providers/auth';
import { hasuraApi } from '@/services/hasura/api';
import { Protocol_Api_AuthType } from '@/services/hasura/types';
import { useQuery } from '@tanstack/react-query';

import { Divider, Stack, Typography } from '@mui/material';

import { UserCard } from './components/user-card';

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

  const { isLoading, data: oldUser } = useQuery(
    ['migration', hasura_id],
    () => hasuraApi(token, hasura_id).migration_authentication_user(),
    {
      select: (res) => res.me,
    }
  );

  if (isLoading) return <>Loading</>;
  if (!oldUser) return <>User not found</>;
  const { authentications } = oldUser.protocolUser;
  const auth = authentications?.find((item) => {
    if (item.type !== authType) return;
    switch (authType) {
      case Protocol_Api_AuthType.Email:
        return item.data.email === authData;
      case Protocol_Api_AuthType.Wallet:
        return item.data.address === authData;
      default:
        return false;
    }
  });

  if (!auth) return <>Auth not found</>;
  const remainingAuthenticaiton = authentications.filter(
    (item) => item.id !== auth.id
  );
  const isMigrating = remainingAuthenticaiton.length === 0;

  return (
    <>
      {/* // <ModalRightConfirmation
    //   title="This account is already connected to another Gateway ID, do you want to migrate to this ID?"
    //   open={isOpen}
    //   handleClose={onClose}
    // > */}
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
          variant={isMigrating ? 'error' : 'normal'}
        />
        <ArrowDivider />
        <UserCard
          user={me}
          auth={auth}
          variant={isMigrating ? 'sucess' : 'raised'}
        />
      </Stack>
      <Divider sx={{ my: 4 }} />
      <Typography fontWeight={600} sx={{ mb: 3 }}>
        Migrating the account, be aware:
      </Typography>
      <Stack direction="column" divider={<Divider />}>
        <Typography sx={{ py: 2 }}>
          {`All credentials addressed to this ID will be migrated to ${me.username}`}
        </Typography>
        {isMigrating
          ? [
              <Typography
                key="id-will-deactivated"
                sx={{ py: 2 }}
                color="error"
              >
                {`The ID ${oldUser.username} will be deactivated`}
              </Typography>,
              <Typography key="undo" sx={{ py: 2 }} color="error">
                {"You won't be able undo this action"}
              </Typography>,
            ]
          : [
              <Typography key="wont-be-deactivated" sx={{ py: 2 }}>
                {`The ID ${oldUser.username} won't be deactivated`}
              </Typography>,
              <Typography key="wont-connect" sx={{ py: 2 }}>
                {`You won't be able to connect to ${oldUser.username} by this account`}
              </Typography>,
              <Typography key="undo" sx={{ py: 2 }}>
                {"You won't be able undo this action"}
              </Typography>,
            ]}
      </Stack>
      <Divider sx={{ mt: 4 }} />
      <ConfirmDelete
        {...(isMigrating
          ? {
              textKey: 'migrate account and deactivate ID',
              buttonText: 'Migrate and Deactivate',
              checkText:
                "I acknowledge that upon account migration and Gateway ID deactivation, I won't be able undo these actions",
            }
          : {
              textKey: 'migrate account',
              buttonText: 'Migrate',
              checkText:
                "I acknowledge that upon account migration, I won't be able undo these actions",
            })}
        onCancel={onClose}
        onConfirm={() => {}}
      />
      {/* </ModalRightConfirmation> */}
    </>
  );
}
