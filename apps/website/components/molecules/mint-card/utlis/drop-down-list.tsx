import { Menu, MenuItem } from '@mui/material';

export const MoreList = ({ anchorEl, open, handleClose, categories, skip }) => {
  skip = skip || 0;
  return (
    <Menu
      id="long-menu"
      MenuListProps={{
        'aria-labelledby': 'long-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      {categories.slice(skip).map((category) => (
        <MenuItem key={category} onClick={handleClose}>
          {category}
        </MenuItem>
      ))}
    </Menu>
  );
};
