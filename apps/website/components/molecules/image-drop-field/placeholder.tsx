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
      <Typography
        variant="caption"
        textAlign={'center'}
        paddingX={4}
        marginTop={2}
      >
        File supported: JPG, PNG, GIF, SVG Max size: 5 MB
      </Typography>
    </Box>
  );
}
