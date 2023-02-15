import useTranslation from 'next-translate/useTranslation';

import { useFormContext } from 'react-hook-form';

import { alpha, Box, Card, Stack } from '@mui/material';

import { ImageDropField } from '../../../../../molecules/image-drop-field';

export function ImageField() {
  const { control } = useFormContext();
  const { t } = useTranslation('protocol');

  return (
    <Stack
      justifyContent="center"
      flexDirection="row"
      sx={{
        background: alpha('rgb(0,0,0)', 0.25),
        borderRadius: 2,
        mb: 3,
        maxWidth: '140px',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        }}
      >
        <Box sx={{ aspectRatio: 1, paddingTop: '100%', position: 'relative' }}>
          <Box sx={{ position: 'absolute', inset: 0 }}>
            <ImageDropField
              withCrop
              control={control}
              name="image"
              label={t('credential.image')}
            />
          </Box>
        </Box>
      </Card>
    </Stack>
  );
}
