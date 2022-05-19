import { useForm } from 'react-hook-form';

import { Box } from '@mui/material';

import { ImageDropField } from '../components/molecules/image-drop-field/image-drop-field';

export default function Drop() {
  const { watch, control } = useForm({});

  console.log(watch('avatar'));
  return (
    <Box
      sx={{
        width: 500,
        height: 500,
        alignSelf: 'center',
        justifyCenter: 'center',
      }}
    >
      <ImageDropField
        label="Drop your avatar here"
        name="avatar"
        control={control}
        withCrop
      />
    </Box>
  );
}
