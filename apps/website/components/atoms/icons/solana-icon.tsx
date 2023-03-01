import { SvgIcon, SvgIconProps } from '@mui/material';

export default function SolanaIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14.6764 6.662H2.15137L5.32012 3.50262H17.8451L14.6764 6.662Z" />
      <path d="M14.6764 16.4977H2.15137L5.32012 13.3399H17.8451L14.6764 16.4977Z" />
      <path d="M17.8451 11.5774H5.32012L2.15137 8.41799H14.6764L17.8451 11.5774Z" />
    </SvgIcon>
  );
}
