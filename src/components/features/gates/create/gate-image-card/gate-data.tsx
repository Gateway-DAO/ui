import { limitChars, showIfNotEmpty } from '@/utils/string';
import { useFormContext } from 'react-hook-form';

import { CardHeader, Chip, Stack, Typography } from '@mui/material';

import { CreateGateData } from '../schema';

export function GateData() {
  const { watch } = useFormContext<CreateGateData>();
  const title = watch('title');
  const description = watch('description');
  const categories = watch('categories');
  const creatorName = watch('creator.id');

  return (
    <>
      <Typography
        sx={(theme) => ({
          wordBreak: 'break-all',
          fontSize: theme.typography.body2,
          mt: 2,
          mx: 2,
        })}
      >
        {creatorName}
      </Typography>

      <CardHeader
        title={limitChars(showIfNotEmpty(title, 'Credential Title'), 40)}
        sx={(theme) => ({
          '& .MuiCardHeader-title': {
            wordBreak: 'break-all',
            fontSize: theme.typography.h6,
          },
          '& .MuiCardHeader-subheader': {
            fontSize: theme.typography.body2,
          },
        })}
        subheader={`${limitChars(
          showIfNotEmpty(description, 'Credential Description'),
          70
        )}`}
      />
      {categories?.length > 0 && (
        <Stack direction="row" px={2} pt={1} sx={{ flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <Chip
              sx={{ mb: -2.5, ml: `0 !important`, mr: 1 }}
              key={category}
              label={category}
              size="medium"
            />
          ))}
        </Stack>
      )}
    </>
  );
}
