/* eslint-disable @next/next/no-img-element */
/* We don't need next/Image for a dynamic image */
import { useCallback, useState } from 'react';

import Cropper, { Area } from 'react-easy-crop';

import { Add, Remove } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slider,
  Stack,
} from '@mui/material';

import getCroppedImg from './utils';

export type Props = {
  image: string;
  onSubmit: (image?: string) => void;
  onClose: () => void;
};

export function ImageCropDialog({ image, onSubmit, onClose }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const onChangeCrop = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const onCrop = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onSubmit(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, image, onSubmit]);

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>Edit Image</DialogTitle>
      <Box
        sx={{
          width: '100%',
          height: 350,
          position: 'relative',
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onChangeCrop}
          onZoomChange={setZoom}
          zoomSpeed={0.5}
          style={{}}
        />
      </Box>

      <Stack spacing={2} direction="row" alignItems="center" padding={2}>
        <Remove />
        <Slider
          aria-label="Zoom"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e, value) => {
            setZoom(value as number);
          }}
        />
        <Add />
      </Stack>
      <DialogActions
        sx={{
          flexDirection: 'row-reverse',
          justifyContent: 'flex-start',
          gap: 2,
          p: 2,
          pt: 0,
        }}
      >
        <Button type="button" variant="contained" onClick={onCrop}>
          Crop
        </Button>
        <Button type="button" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
