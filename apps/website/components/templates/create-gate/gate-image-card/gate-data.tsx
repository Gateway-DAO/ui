import { useFormContext } from 'react-hook-form';

import { showIfNotEmpty } from '@gateway/helpers';

import { CardHeader } from '@mui/material';

import { CreateGateTypes } from '../schema';

export function GateData() {
  const { watch } = useFormContext<CreateGateTypes>();
  const title = watch('title');
  const description = watch('description');

  return (
    <CardHeader
      title={showIfNotEmpty(title, 'Gate Title')}
      subheader={`${showIfNotEmpty(description, 'Gate Description')}`}
    />
  );
}
