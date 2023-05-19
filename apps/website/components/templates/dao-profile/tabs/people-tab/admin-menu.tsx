import { useMutation } from '@tanstack/react-query';
import { useMenu } from 'apps/website/hooks/use-menu';
import { PartialDeep } from 'type-fest';

import { MoreVert } from '@mui/icons-material';
import {
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';

import { useAuth } from '../../../../../providers/auth';
import { Users } from '../../../../../services/hasura/types';
import { useDaoProfile } from '../../context';

type Props = {
  user: PartialDeep<Users>;
};
export function AdminMenu({ user }: Props) {
  const { gqlAuthMethods } = useAuth();
  const { element, isOpen, onClose, onOpen } = useMenu();
  const { dao, onRefetchFollowers } = useDaoProfile();
  const userIsAdmin = user.permissions?.some(
    ({ permission }) => permission === 'dao_admin'
  );

  const permissionsMutation = useMutation(
    ['dao-permission', user.id, userIsAdmin],
    () => {
      if (userIsAdmin)
        return gqlAuthMethods.dao_set_user_member({
          dao_id: dao.id,
          user_id: user.id,
        });
      return gqlAuthMethods.dao_set_user_admin({
        dao_id: dao.id,
        user_id: user.id,
      });
    },
    {
      onSuccess() {
        onRefetchFollowers();
        onClose();
      },
    }
  );

  return (
    <>
      <IconButton onClick={onOpen}>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={element}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        onClose={onClose}
      >
        <MenuItem
          disabled={permissionsMutation.isLoading}
          onClick={() => permissionsMutation.mutate()}
        >
          {permissionsMutation.isLoading && (
            <ListItemIcon>
              <CircularProgress size={16} />
            </ListItemIcon>
          )}
          {userIsAdmin ? (
            <ListItemText>Remove admin</ListItemText>
          ) : (
            <ListItemText>Turn to admin</ListItemText>
          )}
        </MenuItem>
      </Menu>
    </>
  );
}
