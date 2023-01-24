import InsertLinkIcon from '@mui/icons-material/InsertLink';
import PhotoIcon from '@mui/icons-material/Photo';
import PinIcon from '@mui/icons-material/Pin';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { Chip, Stack, Typography } from '@mui/material';

type Props = {
  type: string;
};

const FieldsIcon = {
  text: TextFieldsIcon,
  number: PinIcon,
  image: PhotoIcon,
  link: InsertLinkIcon,
};

export default function ChipInputType({ type }: Props) {
  const FieldIcon = FieldsIcon[type];
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
          <FieldIcon sx={{ fontSize: '16px' }} />
          <Typography fontSize={12} sx={{ textTransform: 'capitalize' }}>
            {type}
          </Typography>
        </Stack>
      }
    />
  );
}
