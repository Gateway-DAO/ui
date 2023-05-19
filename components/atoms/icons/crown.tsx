import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function CrownIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
