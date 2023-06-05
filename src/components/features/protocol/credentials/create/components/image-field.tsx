import useTranslation from 'next-translate/useTranslation';

import { ImageDropField } from '@/components/molecules/form/image-drop-field';
import { theme } from '@/theme';
import { useFormContext } from 'react-hook-form';

import { alpha, Box, Card, Stack } from '@mui/material';

export function ImageField() {
  const { control } = useFormContext();
  const { t } = useTranslation('protocol');

  return (
    <Stack
      justifyContent="center"
      flexDirection="row"
      id="issuanceflow-image"
      sx={{
        background: alpha(theme.palette.common.black, 0.25),
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
        <Box sx={{ height: 140, width: 140 }}>
          <Box sx={{ height: 140, width: 140 }}>
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