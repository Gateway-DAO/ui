import { useFormContext } from 'react-hook-form';

import { alpha, Box, Card, Stack } from '@mui/material';

import { ImageDropField } from '../../../../../molecules/image-drop-field';
import { ClaimFieldProps } from './ClaimFieldProps';

export function ImageField({
  fieldName,
  label,
  type,
  contentMediaType,
}: ClaimFieldProps) {
  const { control } = useFormContext();

  return (
    <Stack
      justifyContent="center"
      flexDirection="row"
      sx={{ background: alpha('rgb(0,0,0)', 0.25), borderRadius: 2 }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: 232,
          border: 1,
          borderColor: 'rgba(255,255,255,.12)',
          maxWidth: {
            xs: '75%',
            md: '100%',
          },
        }}
      >
        <Box sx={{ aspectRatio: 1, paddingTop: '100%', position: 'relative' }}>
          <Box sx={{ position: 'absolute', inset: 0 }}>
            <ImageDropField
              withCrop
              control={control}
              name={`claim.${fieldName}`}
              label={label || `Drop to upload your avatar`}
            />
          </Box>
        </Box>
      </Card>
    </Stack>
  );
}
