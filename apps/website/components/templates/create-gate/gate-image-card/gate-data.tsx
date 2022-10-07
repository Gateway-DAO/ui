import { useFormContext } from 'react-hook-form';

import { limitChars, showIfNotEmpty } from '@gateway/helpers';

import { CardHeader, Chip, Stack } from '@mui/material';

import { CreateGateTypes } from '../schema';

export function GateData() {
  const { watch } = useFormContext<CreateGateTypes>();
  const title = watch('title');
  const description = watch('description');
  const categories = watch('categories');

  return (
    <>
      <CardHeader
        title={limitChars(showIfNotEmpty(title, 'Credential Title'), 40)}
        sx={(theme) => ({
          '& .MuiCardHeader-title': {
            pb: 1,
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
        <Stack direction="row" p={2} sx={{ flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <Chip
              sx={{ mb: 2, ml: `0 !important`, mr: 1 }}
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
