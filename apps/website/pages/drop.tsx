import { ChangeEvent, forwardRef, useCallback, useMemo, useRef } from 'react';

import styled from '@emotion/styled';
import { useController, useForm, UseFormRegisterReturn } from 'react-hook-form';

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

const DropArea = function DropArea({ label, name, control }) {
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

    /* TODO: Mimetype validation */
    /* TODO: Filesize validation */
    const file = event.target.files[0];
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
        },
        !value
          ? {
              border: '1px dashed',
              borderColor: (theme) => theme.palette.primary.main,
            }
          : {
              backgroundImage: `url(${value})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            },
      ]}
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
        {...register}
      />
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
};

export default function Drop() {
  const { register, watch, control } = useForm({});
  return (
    <div>
      <Box sx={{ width: 500, height: 500 }}>
        <DropArea label="drop area" name="avatar" control={control} />
      </Box>
    </div>
  );
}
