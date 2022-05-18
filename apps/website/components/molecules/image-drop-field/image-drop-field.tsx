import { ChangeEvent, useRef } from 'react';

import styled from '@emotion/styled';
import { useController } from 'react-hook-form';
import { useDropArea } from 'react-use';

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
  Typography,
} from '@mui/material';

const HiddenInput = styled.input`
  visibility: none;
  width: 0;
  height: 0;
  position: absolute;
  top: 0;
`;

export function ImageDropField({ label, name, control }) {
  const {
    field: { ref, value, onChange, ...register },
  } = useController({ name, control });
  const { element, isOpen, onClose, onOpen } = useMenu();

  const inputRef = useRef<HTMLInputElement>(null);

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      onChange();
      return;
    }
    const file = event.target.files[0];
    changeFile(file);
  };

  const changeFile = (file: File) => {
    /* TODO: Mimetype validation */
    /* TODO: Filesize validation */
    const reader = new FileReader();
    reader.onload = (event) => {
      onChange(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const onClickChangeImage = () => {
    inputRef.current?.click();
    onClose();
  };

  const [bond, { over: isOver }] = useDropArea({
    onFiles: (files) => changeFile(files[0]),
  });

  return (
    <Box
      component="label"
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          gap: 1,
          position: 'relative',
          transition: 'background-color 0.2s ease-in-out',
        },
        !value && {
          border: '1px dashed',
          borderColor: (theme) => theme.palette.primary.main,
        },
        isOver && {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      ]}
      {...bond}
      tabIndex={0}
    >
      {!value && (
        <>
          <Avatar>
            <UploadFileOutlined />
          </Avatar>
          <Typography>{label}</Typography>
        </>
      )}
      <HiddenInput
        type="file"
        ref={(el) => {
          ref(el);
          inputRef.current = el;
        }}
        onChange={onSelectFile}
        accept="image/*"
        tabIndex={-1}
        {...register}
      />
      <IconButton
        color="secondary"
        sx={{ position: 'absolute', bottom: 6, left: 6, zIndex: 10 }}
        onClick={onOpen}
      >
        <Avatar>
          <Edit />
        </Avatar>
      </IconButton>
      {value && (
        <Box
          sx={{
            backgroundImage: `url(${value})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
          style={isOver ? { opacity: 0.5 } : {}}
        />
      )}
      <Menu
        id="drop"
        anchorEl={element}
        keepMounted
        open={isOpen}
        onClose={onClose}
      >
        <MenuItem onClick={onClickChangeImage}>
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
}
