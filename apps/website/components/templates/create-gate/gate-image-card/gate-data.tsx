import { useFormContext } from 'react-hook-form';

import { limitChars, showIfNotEmpty } from '@gateway/helpers';

import { CardHeader } from '@mui/material';

import { CreateGateTypes } from '../schema';

export function GateData() {
  const { watch } = useFormContext<CreateGateTypes>();
  const title = watch('title');
  const description = watch('description');

  return (
    <CardHeader
      title={limitChars(showIfNotEmpty(title, 'Gate Title'), 20)}
      subheader={`${limitChars(
        showIfNotEmpty(description, 'Gate Description'),
        70
      )}`}
    />
  );
}
