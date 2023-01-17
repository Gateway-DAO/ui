import InsertLinkIcon from '@mui/icons-material/InsertLink';
import PhotoIcon from '@mui/icons-material/Photo';
import PinIcon from '@mui/icons-material/Pin';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { Chip, Divider, Stack, Typography } from '@mui/material';

import CardCell from './card-cell';

type Props = {
  data: any[];
  column2: string;
  isInputType?: boolean;
};

export default function TwoColumns({
  data,
  column2,
  isInputType = false,
}: Props) {
  const inputTypeContent = (inputType: string) => {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={0.5}
      >
        {inputType === 'text' && <TextFieldsIcon sx={{ fontSize: '16px' }} />}
        {inputType === 'number' && <PinIcon sx={{ fontSize: '16px' }} />}
        {inputType === 'image' && <PhotoIcon sx={{ fontSize: '16px' }} />}
        {inputType === 'link' && <InsertLinkIcon sx={{ fontSize: '16px' }} />}
        <Typography fontSize={12} sx={{ textTransform: 'capitalize' }}>
          {inputType}
        </Typography>
      </Stack>
    );
  };
  return (
    <Stack divider={<Divider />}>
      {data?.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <CardCell label={item.name} margin={false} py={3}>
            {`${item.value}`}
          </CardCell>
          <Typography sx={{ mr: { xs: 0, md: 2 }, my: 2 }}>
            {isInputType ? (
              <Chip variant="filled" label={inputTypeContent(item[column2])} />
            ) : (
              item[column2]
            )}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
