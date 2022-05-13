import { useFormContext } from 'react-hook-form';
import { useMeasure } from 'react-use';

import { Card, CardHeader, CardMedia } from '@mui/material';

import { NewUserForm } from './schema';
export function AvatarUploadCard() {
  /* TODO: Improve this */
  const [ref, bounds] = useMeasure();

  const { watch } = useFormContext<NewUserForm>();

  const name = watch('name');
  const username = watch('username');

  return (
    <Card
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        border: 1,
        borderColor: 'rgba(255,255,255,.12)',
      }}
    >
      <CardMedia
        sx={{
          width: '100%',
          aspectRatio: '1',
          height: '100%',
          borderBottom: 1,
          borderColor: 'rgba(255,255,255,.12)',
        }}
        ref={ref}
        style={{ width: bounds.height }}
        component="img"
        src="https://images.unsplash.com/photo-1650943574955-ac02c65cfc71?w=500"
      />
      <CardHeader
        title={name?.length > 0 ? name : 'Display Name'}
        subheader={`@${username?.length > 0 ? username : 'username'}`}
      />
    </Card>
  );
}
