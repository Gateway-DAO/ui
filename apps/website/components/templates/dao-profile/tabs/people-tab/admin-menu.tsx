import { useMutation } from 'react-query';
import { PartialDeep } from 'type-fest';

import { useMenu } from '@gateway/ui';

import { MoreVert } from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';

import { useAuth } from '../../../../../providers/auth';
import { Users } from '../../../../../services/graphql/types.generated';
import { useDaoProfile } from '../../context';

type Props = {
  user: PartialDeep<Users>;
};
export function AdminMenu({ user }: Props) {
  const {} = useAuth();
  const { element, isOpen, onClose, onOpen, withOnClose } = useMenu();

  const userIsAdmin = user.permissions?.some(
    ({ permission }) => permission === 'admin'
  );

  const permissionsMutation = useMutation(() => {});

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
        {userIsAdmin ? (
          <MenuItem onClick={withOnClose(() => {})}>
            <Typography textAlign="center">Remove admin</Typography>
          </MenuItem>
        ) : (
          <MenuItem onClick={withOnClose(() => {})}>
            <Typography textAlign="center">Turn to admin</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
