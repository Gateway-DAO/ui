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
      PaperProps={{
        style: {
          maxHeight: '112px',
          width: '199px',
        },
        sx: {
          '&::-webkit-scrollbar': {
            width: '0.1em',
          },
          '&::-webkit-scrollbar-track': {
            '-webkit-border-radius': 10,
            borderRadius: 10,
          },
          '&::-webkit-scrollbar-thumb': {
            '-webkit-border-radius': 10,
            backgroundColor: 'rgba(255, 255, 255, 0.3);',
            borderRadius: 5,
          },
          marginTop: -1,
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      {categories.slice(skip).map((category) => (
        <MenuItem key={category} onClick={handleClose}>
          {category}
        </MenuItem>
      ))}
    </Menu>
  );
};