import { ArrowDivider } from '@/components/atoms/arrow-divider';
import { ModalRightConfirmation } from '@/components/molecules/modal/modal-right-confirmation';
import { ConfirmDelete } from '@/components/organisms/confirm-delete/confirm-delete';
import { Protocol_Api_Auth, Users } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

import { Divider, Stack, Typography } from '@mui/material';

import { UserCard } from './components/user-card';

type Props = {
  currentUser: PartialDeep<Users>;
  oldUser: PartialDeep<Users>;
  auth: PartialDeep<Protocol_Api_Auth>;
  isOpen: boolean;
  onClose: () => void;
};

export function MigrationModal({
  isOpen,
  onClose,
  currentUser,
  oldUser,
  auth,
}: Props) {
  const isMigrating = true;
  return (
    <ModalRightConfirmation
      title="This account is already connected to another Gateway ID, do you want to migrate to this ID?"
      open={isOpen}
      handleClose={onClose}
    >
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
          user={currentUser}
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
          {`All credentials addressed to this ID will be migrated to ${currentUser.username}`}
        </Typography>
        {isMigrating
          ? [
              <Typography
                key="id-will-deactivated"
                sx={{ py: 2 }}
                color="error"
              >
                {`The ID <b>${oldUser.username}</b> will be deactivated`}
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
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    </ModalRightConfirmation>
  );
}
