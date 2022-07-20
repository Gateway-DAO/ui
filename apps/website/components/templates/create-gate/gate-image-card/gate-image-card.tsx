import { useFormContext } from 'react-hook-form';

import { GatewaySxProps } from '@gateway/theme';

import { Box, Card, CardMedia } from '@mui/material';

import { ImageDropField } from '../../../molecules/image-drop-field';
import { CreateGateTypes } from '../schema';
import { GateData } from './gate-data';

type Props = {
  showGateData?: boolean;
  sx?: GatewaySxProps;
};

export function GateImageCard({ showGateData = true, sx }: Props) {
  const { control } = useFormContext<CreateGateTypes>();

  const ConnectedAvatarField = () => (
    <Box sx={{ aspectRatio: 1, paddingTop: '100%', position: 'relative' }}>
      <Box sx={{ position: 'absolute', inset: 0 }}>
        <ImageDropField
          withCrop
          control={control}
          name="image"
          label="Drop to upload your avatar"
        />
      </Box>
    </Box>
  );

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
          xs: '75%',
          md: '100%',
        },
        ...sx,
      }}
    >
      <CardMedia component={ConnectedAvatarField} />
      {showGateData && <GateData />}
    </Card>
  );
}
