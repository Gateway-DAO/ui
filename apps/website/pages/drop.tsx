import { forwardRef } from 'react';

import styled from '@emotion/styled';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';

import { useMenu } from '@gateway/ui';

import { Edit, Photo, Token, UploadFileOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

type Props = Omit<UseFormRegisterReturn, 'ref'> & { label: string; id: string };

const HiddenInput = styled.input`
  visibility: none;
  width: 0;
  height: 0;
  position: absolute;
  top: 0;
`;

/* NOTE: <Controller /> or ...register ? */
const DropArea = forwardRef<HTMLInputElement, Props>(function DropArea(
  { label, ...register },
  ref
) {
  const { element, isOpen, onClose, onOpen } = useMenu();

  return (
    <Box
      component="label"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        border: '1px dashed',
        borderColor: (theme) => theme.palette.primary.main,
        gap: 1,
        position: 'relative',
      }}
    >
      <Avatar>
        <UploadFileOutlined />
      </Avatar>
      <Typography>{label}</Typography>
      <HiddenInput type="file" ref={ref} {...register} />
      <IconButton
        color="secondary"
        sx={{ position: 'absolute', bottom: 6, left: 6 }}
        onClick={onOpen}
      >
        <Avatar>
          <Edit />
        </Avatar>
      </IconButton>
      <Menu
        id="drop"
        anchorEl={element}
        keepMounted
        open={isOpen}
        onClose={onClose}
      >
        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <Photo fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>Upload photo</ListItemText>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <Token fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>Select NFT</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
});

export default function Drop() {
  const { register, watch, control } = useForm();
  console.log(watch('avatar'));
  return (
    <div>
      <Box sx={{ width: 500, height: 500 }}>
        <DropArea label="drop area" id="avatar" {...register('avatar', {})} />
      </Box>
    </div>
  );
}
