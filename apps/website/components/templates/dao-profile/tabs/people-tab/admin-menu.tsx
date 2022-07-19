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

import { Users } from '../../../../../services/graphql/types.generated';
import { useDaoProfile } from '../../context';

type Props = {
  user: PartialDeep<Users>;
};
export function AdminMenu({ user }: Props) {
  const { element, isOpen, onClose, onOpen, withOnClose } = useMenu();
  console.log(user);
  const userIsAdmin = user.permissions?.some(
    ({ permission }) => permission === 'admin'
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
        {/* <NestedMenuItem label="Languages" parentMenuOpen={isOpen}>
          <MenuItem onClick={onChangeLanguage('en')}>English</MenuItem>
          <MenuItem onClick={onChangeLanguage('pt-BR')}>
            Portuguese (Brazil)
          </MenuItem>
        </NestedMenuItem> */}
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
