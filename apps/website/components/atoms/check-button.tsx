import { brandColors } from '@gateway/theme';
import { ButtonProps, CircularProgress, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ReactNode } from 'react';

type Props = {
  isLoading?: boolean;
  checked?: boolean;
  children: ReactNode;
  clickHandler?: () => any;
} & ButtonProps;

export function CheckedButton({
  isLoading,
  checked,
  children,
  clickHandler,
  ...other
}: Props) {
  return (
    <IconButton
      onClick={() => clickHandler()}
      sx={(theme) => ({
        borderRadius: '20px',
        cursor: 'pointer',
        background: checked ? brandColors.green.main : brandColors.background.light,
        fontSize: '11px',
        textTransform: 'uppercase',
        fontWeight: theme.typography.fontWeightBold,
        border: checked ? '1px solid transparent' : `1px solid ${brandColors.purple.main}`,
        color: checked ? '#170627' : brandColors.purple.main,
        padding: '4px 8px',
        minHeight: '30px',
        transition: 'all .3s ease',
        '&:hover': {
          borderColor: checked ? brandColors.green.dark : brandColors.purple.dark,
          backgroundColor: checked ? brandColors.green.dark : brandColors.background.light,
        },
      })}
      >
        {
          isLoading &&
          <CircularProgress size="15px" sx={{ mr: 1 }} />
        }
        {
          checked && !isLoading &&
          <CheckCircleIcon sx={{ fontSize: '15px', display: checked ? 'block' : 'none', mr: 1 }} />
        }
        {children}
    </IconButton>
  );
}

