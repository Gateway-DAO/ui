import { useMemo } from 'react';

import { showIfNotEmpty } from 'apps/website/utils/string';
import { useFormContext } from 'react-hook-form';

import { Card, CardActions, CardHeader, CardMedia, Chip } from '@mui/material';

import { mockCategories } from './__mock__';
import { NewCredentialSchema } from './schema';

/* TODO: Drop image field */
/* TODO: Translate  */
export function AvatarUploadCard() {
  const { watch } = useFormContext<NewCredentialSchema>();

  const name = watch('name');
  const description = watch('description');
  const category = watch('category');

  const categoryLabel = useMemo(
    () => mockCategories.find(({ value }) => category === value)?.label,
    [category]
  );

  return (
    <Card
      sx={{
        border: 1,
        borderColor: 'rgba(255,255,255,.12)',
      }}
    >
      <CardMedia
        sx={{
          aspectRatio: '1',
          borderBottom: 1,
          borderColor: 'rgba(255,255,255,.12)',
          width: (theme) => theme.spacing(37.75),
        }}
        component="img"
        src="https://images.unsplash.com/photo-1650943574955-ac02c65cfc71?w=500"
      />
      <CardHeader
        title={showIfNotEmpty(name, 'Title')}
        subheader={showIfNotEmpty(description, 'Description')}
      />
      <CardActions>
        <Chip size="small" label={showIfNotEmpty(categoryLabel, 'Category')} />
      </CardActions>
    </Card>
  );
}
