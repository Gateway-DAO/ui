import Link from 'next/link';
import { ReactNode } from 'react';

import { brandColors } from '@gateway/theme';

import { alpha, Box } from '@mui/material';

type Props = {
  url: string;
  children: ReactNode;
};

export default function NetworkTransactionLink({
  url,
  children,
}: Props): JSX.Element {
  return (
    <Link href={url} target="_blank" passHref>
      <Box
        sx={{
          backgroundColor: alpha(brandColors.white.main, 0.16),
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Link>
  );
}
