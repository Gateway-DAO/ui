import { Chip } from '@mui/material';
import { Subjects } from '../index';
import { useState } from 'react';
import { MoreList } from './drop-down-list';

export const showCategories = (mintProcessStatus, categories) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (categories.length > 0) {
    if (mintProcessStatus === Subjects.default) {
      return (
        <>
          {categories.slice(0, 1).map((category, index) => (
            <Chip key={category} label={category} size="small" />
          ))}
          {categories.length > 1 && (
            <Chip
              key={'more'}
              label={'+' + (categories.length - 1)}
              size="small"
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            />
          )}
          {MoreList({ anchorEl, open, handleClose, categories, skip: 1 })}
        </>
      );
    }

    if (mintProcessStatus === Subjects.alreadyMinted) {
      return (
        <>
          {categories.slice(0, 2).map((category, index) => (
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
  }

  return null;
};
