import { brandColors } from 'apps/website/theme';

import LaunchIcon from '@mui/icons-material/Launch';
import { Stack, Link, Typography, alpha, SxProps, Theme } from '@mui/material';

type Props = {
  text: string;
  handleClick: (e) => void;
  sxProps?: SxProps<Theme>;
  id?: string;
};

export default function ExternalLink({
  text,
  handleClick,
  sxProps,
  id,
}: Props) {
  return (
    <Link
      component={Stack}
      gap={1}
      direction="row"
      alignItems="center"
      sx={{
        textDecoration: 'none',
        position: 'relative',
        cursor: 'pointer',
        zIndex: 1,
        ...sxProps,
      }}
      id={id}
      onClick={handleClick}
    >
      <Typography
        fontSize={12}
        sx={{ color: alpha(brandColors.white.main, 0.7) }}
      >
        {text}
      </Typography>
      <LaunchIcon
        sx={{ color: alpha(brandColors.white.main, 0.7), fontSize: '14px' }}
      />
    </Link>
  );
}
