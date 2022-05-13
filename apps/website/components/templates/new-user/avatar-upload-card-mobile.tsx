import { Card, CardHeader, CardMedia } from '@mui/material';

/* TODO: Join with AvatarUploadCard */
export function AvatarUploadCardMobile() {
  return (
    <Card
      sx={{
        display: { xs: 'flex', md: 'none' },
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        border: 1,
        borderColor: 'rgba(255,255,255,.12)',
        aspectRatio: '1',
        maxWidth: '75%',
      }}
    >
      <CardMedia
        sx={{
          width: '100%',
          height: '100%',
        }}
        component="img"
        src="https://images.unsplash.com/photo-1650943574955-ac02c65cfc71?w=500"
      />
    </Card>
  );
}
