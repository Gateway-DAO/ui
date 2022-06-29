import { MouseEvent } from 'react';

import { useMenu } from '@gateway/ui';

import {
  ArrowDropDown,
  ArrowDropUp,
  CheckBox,
  CheckBoxOutlineBlank,
  Clear,
} from '@mui/icons-material';
import {
  Chip,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material';

import { Option } from '../../types/input';

type Props<T = string> = {
  label: string;
  values: Option<T>[];
  selected: T[];
  autoClose?: boolean;
  onClear: () => void;
  onToggle: (value: T) => void;
};

export function ChipDropdown<T = string>({
  label,
  values,
  selected,
  autoClose = false,
  onToggle,
  onClear,
}: Props<T>) {
  const { element, isOpen, onClose, onOpen } = useMenu();
  const toggleOpen = (e: MouseEvent<HTMLElement>) => {
    if (isOpen) {
      return onClose();
    }
    return onOpen(e);
  };

  const onSelect = (value: T) => () => {
    onToggle(value);
    if (autoClose) {
      onClose();
    }
  };

  return (
    <>
      <Chip
        label={label}
        deleteIcon={isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
        onClick={toggleOpen}
        onDelete={() => {}}
        sx={{ '.MuiChip-deleteIcon': { pointerEvents: 'none' } }}
      />
      <Menu
        id="basic-menu"
        anchorEl={element}
        open={isOpen}
        onClose={onClose}
        sx={{ py: 0 }}
        MenuListProps={{ dense: true }}
      >
        {values.map(({ label, value }) => (
          <MenuItem key={label} onClick={onSelect(value)}>
            <ListItemIcon>
              {selected.includes(value) ? (
                <CheckBox />
              ) : (
                <CheckBoxOutlineBlank />
              )}
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={onClear}>
          <ListItemIcon>
            <Clear />
          </ListItemIcon>
          <ListItemText>Clear</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
