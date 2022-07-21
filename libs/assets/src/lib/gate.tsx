import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function GateIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M5 21H19V10C19 6.13401 15.866 3 12 3C8.13401 3 5 6.13401 5 10V21Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
