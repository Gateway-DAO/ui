import { brandColors } from '@gateway/theme';

import LaunchIcon from '@mui/icons-material/Launch';
import { Stack, Link, Typography, alpha } from '@mui/material';

type Props = {
  text: string;
  url: string;
};

export default function ExternalLink({ text, url }: Props) {
  const navigate = (e) => {
    e.stopPropagation();
    window.open(url);
  };

  return (
    <Link
      component={Stack}
      gap={1}
      direction="row"
      alignItems="center"
      sx={{ textDecoration: 'none', position: 'relative', cursor: 'pointer' }}
      onClick={(e) => navigate(e)}
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
