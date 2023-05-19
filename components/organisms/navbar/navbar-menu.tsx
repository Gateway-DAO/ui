import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton } from '@mui/material';

import { useNav } from '../../../hooks/use-nav';
export function NavbarMenu() {
  const { onOpen } = useNav();
  return (
    <IconButton
      sx={{ display: { md: 'none', xs: 'inline-block' } }}
      type="button"
      onClick={onOpen}
      aria-label="Open menu"
    >
      <Avatar>
        <MenuIcon />
      </Avatar>
    </IconButton>
  );
}
