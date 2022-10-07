import { useMenu } from '@gateway/ui';
import useTranslation from 'next-translate/useTranslation';
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

  onClickUploadPhoto,
  onReset,
}: Props) {
  const { element, isOpen, onClose, onOpen, withOnClose } = useMenu();
  const { t } = useTranslation('common');

  return (
    <>
      <IconButton
        color="secondary"
        sx={{ position: 'absolute', bottom: 6, left: 6, zIndex: 10 }}
        onClick={onOpen}
        className="MuiEditButton-root"
      >
        <Avatar sx={{ backgroundColor: 'primary.dark' }}>
          <Edit />
        </Avatar>
      </IconButton>
      <Menu
        id={`${name}-menu`}
        anchorEl={element}
        open={isOpen}
        onClose={onClose}
      >
        <MenuItem onClick={withOnClose(onClickUploadPhoto)}>
          <ListItemIcon>
            <Photo fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>{t('image-drop-field.upload-photo')}</ListItemText>
        </MenuItem>

        <MenuItem onClick={withOnClose(onReset)}>
          <ListItemIcon>
            <RemoveCircle fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>{t('image-drop-field.remove-photo')}</ListItemText>
        </MenuItem>

        <MenuItem disabled>
          <ListItemIcon>
            <Token fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText>{t('image-drop-field.select-nft')}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
