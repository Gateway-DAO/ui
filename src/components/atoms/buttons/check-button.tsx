import { useEffect, useState } from 'react';

import { brandColors } from '@/theme';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

type Props = {
  isLoading?: boolean;
  checked?: boolean;
  clickHandler?: () => any;
  labelOn?: string;
  labelOff?: string;
  labelOffHover?: string;
} & ButtonProps;

function ConnectorBtnIcon({
  isLoading,
  checked,
  labelOffHover,
  buttonLabel,
}: Pick<Props, 'isLoading' | 'checked' | 'labelOffHover'> & {
  buttonLabel?: string;
}) {
  if (isLoading) return <CircularProgress />;
  if (checked && !isLoading && !(buttonLabel == labelOffHover))
    return <CheckCircleIcon />;
  if (buttonLabel == labelOffHover) return <CancelIcon />;
  return null;
}

export function CheckedButton({
  isLoading,
  checked,
  clickHandler,
  labelOn,
  labelOff,
  labelOffHover,
  ...other
}: Props) {
  const [buttonLabel, setButtonLabel] = useState<string>(
    checked ? labelOn : labelOff
  );

  useEffect(() => {
    checked ? setButtonLabel(labelOn) : setButtonLabel(labelOff);
  }, [checked]);

  const hoverButtonLabel = () => {
    if (!labelOffHover) return;
    if (buttonLabel == labelOn) {
      setButtonLabel(labelOffHover);
    } else if (buttonLabel == labelOffHover) {
      setButtonLabel(labelOn);
    }
  };

  return (
    <Button
      onClick={() => (clickHandler ? clickHandler() : null)}
      onMouseEnter={() => hoverButtonLabel()}
      onMouseLeave={() => hoverButtonLabel()}
      startIcon={
        <ConnectorBtnIcon
          isLoading={isLoading}
          checked={checked}
          labelOffHover={labelOffHover}
          buttonLabel={buttonLabel}
        />
      }
      sx={{
        background: checked
          ? brandColors.green.main
          : brandColors.background.light,
        border: checked
          ? '1px solid transparent'
          : `1px solid ${brandColors.purple.main}`,
        color: checked ? '#170627' : brandColors.purple.main,
        '&:hover': {
          borderColor: checked ? null : brandColors.purple.dark,
          backgroundColor: checked
            ? brandColors.red.dark
            : brandColors.background.light,
        },
      }}
    >
      {buttonLabel}
    </Button>
  );
}
