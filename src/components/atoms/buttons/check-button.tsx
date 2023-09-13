import { ReactNode, useState } from 'react';

import { brandColors } from '@/theme';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

type Props<C extends React.ElementType> = {
  isLoading?: boolean;
  isChecked?: boolean;
  isHover?: boolean;
  clickHandler?: () => any;
  labelOn?: string;
  labelOff?: string;
  labelOffHover?: string;
  component?: C;
} & ButtonProps;

export function CheckButton<C extends React.ElementType>({
  isLoading,
  isChecked,
  clickHandler,
  labelOn,
  labelOff,
  labelOffHover,
  isHover: isPropHover,
  ...other
}: Props<C>) {
  const [isHover, setIsHover] = useState(false);
  const onFocus =
    typeof isPropHover === 'undefined' ? () => setIsHover(true) : undefined;
  const onBlur =
    typeof isPropHover === 'undefined' ? () => setIsHover(false) : undefined;

  const isHoverState = isPropHover ?? isHover;

  let buttonLabel = isChecked ? labelOn : labelOff;
  if (isHoverState && isChecked && labelOffHover) {
    buttonLabel = labelOffHover;
  }

  let icon: ReactNode;
  if (isLoading) {
    icon = <CircularProgress size={18} />;
  } else if (isChecked && !isHoverState) {
    icon = <CheckCircleIcon />;
  } else if (isChecked && isHoverState) {
    icon = <CancelIcon />;
  }

  const hoverStyle = {
    borderColor: isChecked ? null : brandColors.purple.dark,
    backgroundColor: isChecked
      ? brandColors.red.dark
      : brandColors.background.light,
  };

  return (
    <Button
      onClick={clickHandler}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      onFocus={onFocus}
      onBlur={onBlur}
      startIcon={icon}
      {...other}
      disableRipple={!!other.component}
      sx={{
        ...other?.sx,
        background: isChecked
          ? brandColors.green.main
          : brandColors.background.light,
        border: isChecked
          ? '1px solid transparent'
          : `1px solid ${brandColors.purple.main}`,
        color: isChecked ? '#170627' : brandColors.purple.main,
        ...(isHoverState && {
          ...hoverStyle,
          '&:hover': hoverStyle,
        }),
      }}
    >
      {buttonLabel}
    </Button>
  );
}
