import { useForm } from 'react-hook-form';

import { Box } from '@mui/material';

import { ImageDropField } from '../components/molecules/image-drop-field/image-drop-field';

export default function Drop() {
  const { register, watch, control } = useForm({});
  return (
    <div>
      <Box sx={{ width: 500, height: 500 }}>
        <ImageDropField label="drop area" name="avatar" control={control} />
      </Box>
      {watch('avatar')?.slice(0, 10)}
    </div>
  );
}
