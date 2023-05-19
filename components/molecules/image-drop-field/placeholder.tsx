import { ReactNode } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { UploadFileOutlined } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';

type Props = {
  label: ReactNode;
};

export function Placeholder({ label }: Props) {
  const { t } = useTranslation('common');
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
        {t('image-drop-field.upload-info')}
      </Typography>
    </Box>
  );
}
