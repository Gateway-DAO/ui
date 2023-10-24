import { useState } from 'react';

import { Chip } from '@mui/material';

import { MoreList } from './drop-down-list';

export const Categories = ({ categories }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (categories.length > 0) {
    return (
      <>
        {categories.slice(0, 2).map((category: string) => (
          <Chip key={category} label={category} size="small" />
        ))}
        {categories.length > 2 && (
          <Chip
            key={'more'}
            label={'+' + (categories.length - 2)}
            size="small"
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          />
        )}
        {MoreList({ anchorEl, open, handleClose, categories, skip: 2 })}
      </>
    );
  }

  return null;
};
