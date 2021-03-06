import { ReactNode } from 'react';

import { UploadFileOutlined } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';

type Props = {
  label: ReactNode;
};

export function Placeholder({ label }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        pointerEvents: 'none',
      }}
    >
      <Avatar>
        <UploadFileOutlined />
      </Avatar>
      {typeof label === 'string' ? <Typography>{label}</Typography> : label}
    </Box>
  );
}
