import { useRouter } from 'next/router';

import { brandColors } from 'apps/website/theme';

import LaunchIcon from '@mui/icons-material/Launch';
import { Stack, Link, Typography, alpha } from '@mui/material';

type Props = {
  text: string;
  url: string;
};

export default function InternalLink({ text, url }: Props) {
  return (
    <Link
      component={Stack}
      gap={1}
      direction="row"
      alignItems="center"
      sx={{ textDecoration: 'none', position: 'relative', cursor: 'pointer' }}
      href={url}
    >
      <a>
        <Typography
          fontSize={12}
          sx={{ color: alpha(brandColors.white.main, 0.7) }}
        >
          {text}
        </Typography>
        <LaunchIcon
          sx={{ color: alpha(brandColors.white.main, 0.7), fontSize: '14px' }}
        />
      </a>
    </Link>
  );
}
