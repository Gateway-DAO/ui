import { useEffect, useState } from 'react';

import { brandColors } from '@gateway/theme';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ButtonProps, CircularProgress, IconButton } from '@mui/material';

type Props = {
  isLoading?: boolean;
  checked?: boolean;
  clickHandler?: () => any;
  labelOn?: string;
  labelOff?: string;
  labelOffHover?: string;
} & ButtonProps;

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
    <IconButton
      onClick={() => (clickHandler ? clickHandler() : null)}
      onMouseEnter={() => hoverButtonLabel()}
      onMouseLeave={() => hoverButtonLabel()}
      sx={(theme) => ({
        borderRadius: '20px',
        cursor: 'pointer',
        background: checked
          ? brandColors.green.main
          : brandColors.background.light,
        fontSize: '11px',
        textTransform: 'uppercase',
        fontWeight: theme.typography.fontWeightBold,
        border: checked
          ? '1px solid transparent'
          : `1px solid ${brandColors.purple.main}`,
        color: checked ? '#170627' : brandColors.purple.main,
        padding: '4px 8px',
        minHeight: '30px',
        transition: 'all .3s ease',
        '&:hover': {
          borderColor: checked
            ? brandColors.green.dark
            : brandColors.purple.dark,
          backgroundColor: checked
            ? brandColors.green.dark
            : brandColors.background.light,
        },
      })}
    >
      {isLoading && <CircularProgress size="15px" sx={{ mr: 1 }} />}
      {checked && !isLoading && (
        <CheckCircleIcon
          sx={{ fontSize: '15px', display: checked ? 'block' : 'none', mr: 1 }}
        />
      )}
      {buttonLabel}
    </IconButton>
  );
}
