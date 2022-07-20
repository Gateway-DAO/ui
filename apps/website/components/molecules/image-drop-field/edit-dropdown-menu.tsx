import { useCallback } from 'react';

import { useMenu } from '@gateway/ui';

import { Edit } from '@mui/icons-material';
import { Photo, RemoveCircle, Token } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';

type Props = {
  name: string;
  hasImage?: boolean;
  onClickUploadPhoto: () => void;
  onReset?: () => void;
};

export default function EditDropdownMenu({
  name,
  hasImage,
  onClickUploadPhoto,
  onReset,
}: Props) {
  const { element, isOpen, onClose, onOpen } = useMenu();
  const withClose = useCallback(
    (cb: () => void) => () => {
      cb();
      onClose();
    },
    [onClose]
  );

  return (
    <>
      <IconButton
        color="secondary"
        sx={{ position: 'absolute', bottom: 6, left: 6, zIndex: 10 }}
        onClick={onOpen}
        className="MuiEditButton-root"
      >
        <Avatar
          sx={[
            hasImage && {
              backgroundColor: 'primary.dark',
            },
          ]}
        >
          <Edit />
        </Avatar>
      </IconButton>
      <Menu
        id={`${name}-menu`}
        anchorEl={element}
        open={isOpen}
        onClose={onClose}
      >
        <MenuItem onClick={withClose(onClickUploadPhoto)}>
          <ListItemIcon>
            <Photo fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>Upload photo</ListItemText>
        </MenuItem>
        {hasImage && (
          <MenuItem onClick={withClose(onReset)}>
            <ListItemIcon>
              <RemoveCircle fontSize="small" color="secondary" />
            </ListItemIcon>
            <ListItemText>Remove photo</ListItemText>
          </MenuItem>
        )}
        <MenuItem disabled>
          <ListItemIcon>
            <Token fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>Select NFT (soon)</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
