import useTranslation from 'next-translate/useTranslation';
import { ReactElement, useEffect } from 'react';

import { ImageDropField } from '@/components/molecules/form/image-drop-field';
import { GatewaySxProps } from '@/theme';
import { useFormContext } from 'react-hook-form';

import { Box, Card, useTheme } from '@mui/material';

import { CreateGateData } from '../schema';
import { GateData } from './gate-data';

type Props = {
  showGateData?: boolean;
  sx?: GatewaySxProps;
  draftImage?: string;
  label?: string | ReactElement;
};

export function GateImageCard({
  showGateData = true,
  sx,
  draftImage,
  label,
}: Props) {
  const theme = useTheme();
  const { control, setValue } = useFormContext<CreateGateData>();
  const { t } = useTranslation('common');

  useEffect(() => {
    setValue('image', draftImage);
  }, [draftImage, setValue]);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        border: 1,
        borderColor: 'rgba(255,255,255,.12)',
        maxWidth: {
          md: '302px',
          xs: '100%',
        },
        ...sx,
      }}
    >
      <Box sx={{ aspectRatio: 1, paddingTop: '100%', position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            maxHeight: {
              md: '302px',
              xs: '100%',
            },
            maxWidth: {
              md: '302px',
              xs: '100%',
            },
          }}
          onMouseEnter={(event) => {
            event.stopPropagation();
            event.preventDefault();
            (event.target as HTMLElement).style.cursor = 'pointer';
          }}
          onDragOver={(event) => {
            event.stopPropagation();
            event.preventDefault();
            (event.target as HTMLElement).style.backgroundColor =
              theme.palette.primary.dark;
          }}
          onDragLeave={(event) => {
            event.stopPropagation();
            event.preventDefault();
            (event.target as HTMLElement).style.backgroundColor = 'unset';
          }}
        >
          <ImageDropField
            withCrop
            control={control}
            name="image"
            label={label || t('image-drop-field.default-label')}
          />
        </Box>
      </Box>
      {showGateData && <GateData />}
    </Card>
  );
}
