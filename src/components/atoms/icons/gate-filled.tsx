import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function GateFilledIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M0 18H14V7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7V18Z"
        fill="#9A53FF"
      />
    </SvgIcon>
  );
}
