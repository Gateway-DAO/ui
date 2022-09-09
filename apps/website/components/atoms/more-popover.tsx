import React from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton, Popover, Typography } from '@mui/material';

type MorePopoverProps = {
  options: {
    text: string;
    action: () => void;
    hidden: boolean;
  }[];
  withBackground?: boolean;
};

const MorePopover = ({ options, withBackground }: MorePopoverProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      {withBackground ? (
        <IconButton
          sx={{
            p: 0,
          }}
          onClick={handleClick}
          key="gate-options"
        >
          <Avatar>
            <MoreVertIcon
              sx={{
                mt: -0.25,
              }}
            />
          </Avatar>
        </IconButton>
      ) : (
        <IconButton
          sx={{
            p: 0,
          }}
          onClick={handleClick}
          key="gate-options"
        >
          <MoreVertIcon
            sx={{
              mt: -0.25,
            }}
          />
        </IconButton>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {options.map((option, index) => {
          return (
            <>
              {!option.hidden && (
                <Typography
                  role="button"
                  key={`${option.text}-${index}`}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    minWidth: '200px',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
                  }}
                  onClick={option.action}
                >
                  {option.text}
                </Typography>
              )}
            </>
          );
        })}
      </Popover>
    </>
  );
};

export default MorePopover;
