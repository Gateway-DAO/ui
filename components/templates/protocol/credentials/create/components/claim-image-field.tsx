import { useFormContext } from 'react-hook-form';

import { theme } from '@/theme';

import { alpha, Box, Card, Stack } from '@mui/material';

import { ImageDropField } from '../../../../../molecules/image-drop-field';
import { ClaimFieldProps } from './ClaimTypes';

export function ClaimImageField({ fieldName, label }: ClaimFieldProps) {
  const { control } = useFormContext();

  return (
    <Stack
      justifyContent="center"
      flexDirection="row"
      sx={{
        background: alpha(theme.palette.common.black, 0.25),
        borderRadius: 2,
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
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
