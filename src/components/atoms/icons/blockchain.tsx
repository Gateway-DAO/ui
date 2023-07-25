import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function BlockChainIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2H2V8H4V16H2V22H8V20H16V22H22V16H20V8H22V2H16V4H8V2ZM16 6V6.49998L13.5 9H10.5L8 6.5V6H16ZM15 10.5L17.5 8H18V16H17.5L15 13.5V10.5ZM13.5 15H10.5L8 17.5V18H16V17.5L13.5 15ZM6.50004 16L9 13.5V10.5L6.50002 8H6V16H6.50004ZM4 6V4H6V6H4ZM18 6V4H20V6H18ZM4 20V18H6V20H4ZM18 20V18H20V20H18ZM11 11H13V13H11V11Z"
        fill="white"
      />
    </SvgIcon>
  );
}
