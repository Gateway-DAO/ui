import { useFormContext } from 'react-hook-form';

import { showIfNotEmpty } from '@gateway/helpers';

import { CardHeader } from '@mui/material';

import { NewUserSchema } from '../schema';

export function UserData() {
  const { watch } = useFormContext<NewUserSchema>();
  const name = watch('name');
  const username = watch('username');

  return (
    <CardHeader
      sx={{wordBreak:"break-word"}}
      title={showIfNotEmpty(name, 'Display Name')}
      subheader={`@${showIfNotEmpty(username, 'username')}`}
    />
  );
}
