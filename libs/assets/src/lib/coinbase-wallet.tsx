import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function CoinbaseWalletIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 200 200" {...props}>
      <circle cx="100" cy="100" r="100" fill="#0052FF" />
      <circle cx="100" cy="100" r="60" fill="#fff" />
      <rect x="81" y="81" width="38" height="38" rx="4" fill="#0052FF" />
    </SvgIcon>
  );
}
