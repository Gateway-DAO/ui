import { SvgIcon, SvgIconProps } from '@mui/material';

export function CirclePlusIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="#9A53FF" />
      <path
        d="M16.6663 12.6663H12.6663V16.6663H11.333V12.6663H7.33301V11.333H11.333V7.33301H12.6663V11.333H16.6663V12.6663Z"
        fill="#E5E5E5"
      />
    </SvgIcon>
  );
}
