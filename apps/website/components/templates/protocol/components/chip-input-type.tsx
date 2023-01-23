import InsertLinkIcon from '@mui/icons-material/InsertLink';
import PhotoIcon from '@mui/icons-material/Photo';
import PinIcon from '@mui/icons-material/Pin';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { Chip, Stack, Typography } from '@mui/material';

type Props = {
  type: string;
};

export default function ChipInputType({ type }: Props) {
  return (
    <Chip
      variant="filled"
      label={
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={0.5}
        >
          {type === 'string' && <TextFieldsIcon sx={{ fontSize: '16px' }} />}
          {type === 'number' && <PinIcon sx={{ fontSize: '16px' }} />}
          {type === 'image' && <PhotoIcon sx={{ fontSize: '16px' }} />}
          {type === 'link' && <InsertLinkIcon sx={{ fontSize: '16px' }} />}
          <Typography fontSize={12} sx={{ textTransform: 'capitalize' }}>
            {type === 'string' ? 'Text' : type}
          </Typography>
        </Stack>
      }
    />
  );
}
