import { useFormContext } from 'react-hook-form';

import { GatewaySxProps } from '@gateway/theme';

import { Box, Card, useTheme } from '@mui/material';

import { ImageDropField } from '../../../molecules/image-drop-field';
import { CreateGateTypes } from '../schema';
import { GateData } from './gate-data';

type Props = {
  showGateData?: boolean;
  sx?: GatewaySxProps;
};

export function GateImageCard({ showGateData = true, sx }: Props) {
  const theme = useTheme();
  const { control } = useFormContext<CreateGateTypes>();

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
            label="Drop to upload your avatar"
          />
        </Box>
      </Box>
      {showGateData && <GateData />}
    </Card>
  );
}
