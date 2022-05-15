import { useFormContext } from 'react-hook-form';

import { Card, CardHeader, CardMedia, Chip } from '@mui/material';

import { NewCredentialSchema } from './schema';

/* TODO: Drop image field */
/* TODO: Translate  */
export function AvatarUploadCard() {
  const { watch } = useFormContext<NewCredentialSchema>();

  const name = watch('name');
  const description = watch('description');
  const category = watch('category');

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
        component="img"
        src="https://images.unsplash.com/photo-1650943574955-ac02c65cfc71?w=500"
      />
      <CardHeader
        title={name?.length > 0 ? name : 'Title'}
        subheader={`@${description?.length > 0 ? description : 'Desription'}`}
      >
        <Chip
          size="small"
          label={category?.length > 0 ? category : 'Category'}
        />
      </CardHeader>
    </Card>
  );
}
