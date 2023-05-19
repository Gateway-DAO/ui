import { useFormContext } from 'react-hook-form';

import { TOKENS } from '@/theme';

import { Box } from '@mui/material';

import { ImageDropField } from '../../../molecules/image-drop-field';
import { NewDAOSchema } from '../schema';

export function AvatarBackgroundFields() {
  const { control } = useFormContext<NewDAOSchema>();
  return (
    <Box
      sx={{
        '.MuiEditButton-root': {
          '.MuiAvatar-root': {
            width: 28,
            height: 28,
            '.MuiSvgIcon-root': {
              fontSize: '1rem',
            },
          },
        },
      }}
    >
      <Box
        sx={{
          height: 260,
          ' > .MuiBox-root': {
            borderRadius: 2,
          },
          '.field-image': {
            borderRadius: 2,
          },
          '.MuiEditButton-root': {
            left: 'unset',
            right: 2,
            bottom: 2,
          },
        }}
      >
        <ImageDropField
          withCrop={false}
          control={control}
          name="background"
          label="Drop to upload your background"
        />
      </Box>
      <Box
        sx={{
          height: 88,
          width: 88,
          borderRadius: '100%',
          border: 4,
          borderColor: 'background.default',
          backgroundColor: 'background.default',
          boxSizing: 'content-box',
          marginLeft: {
            ...TOKENS.CONTAINER_PX,
            lg: 8,
          },
          marginTop: '-44px',
          position: 'relative',
          zIndex: 1,
          ' > .MuiBox-root': {
            borderRadius: '100%',
          },
          '.field-image': {
            borderRadius: '100%',
          },
          '.MuiEditButton-root': {
            left: 'unset',
            right: -14,
            bottom: -14,
          },
        }}
      >
        <ImageDropField
          control={control}
          name="logo"
          label="Drop to upload your avatar"
          hideLabel
        />
      </Box>
    </Box>
  );
}
