import { SvgIcon, SvgIconProps } from '@mui/material';

export default function SolanaIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="14"
      height="12"
      viewBox="0 0 14 12"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M10.7417 3.32828H0.72168L3.25668 0.800781H13.2767L10.7417 3.32828Z" />
      <path d="M10.7417 11.1968H0.72168L3.25668 8.67057H13.2767L10.7417 11.1968Z" />
      <path d="M13.2767 7.26057H3.25668L0.72168 4.73307H10.7417L13.2767 7.26057Z" />
    </SvgIcon>
  );
}
