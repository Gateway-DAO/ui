import Link from 'next/link';

import { brandColors } from '@gateway/theme';

import { alpha, Box, Typography } from '@mui/material';

type Props = {
  image?: string;
  title: string;
  description: string;
  url?: string;
};

export default function NewElementCard({
  image,
  title,
  description,
  url,
}: Props): JSX.Element {
  return (
    <Link passHref href={url}>
      <Box
        sx={{
          background: alpha(brandColors.purple.main, 0.08),
          border: `1px dashed ${brandColors.purple.main}`,
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: '15px',
          py: 10,
          px: 7,
          cursor: 'pointer',
        }}
      >
        {image && <img src={image} alt={title} />}
        <Typography
          sx={{ fontSize: '16px', fontWeight: 400, letterSpacing: '0.15px' }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            lineHeight: '143%',
            letterSpacing: '0.17px',
            color: alpha(brandColors.white.main, 0.7),
          }}
        >
          {description}
        </Typography>
      </Box>
    </Link>
  );
}
