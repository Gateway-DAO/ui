import { ButtonProps } from '@mui/material';

export type FollowButtonProps = {
  wallet: string;
  onSuccess?: () => void;
} & ButtonProps;
