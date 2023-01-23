import { Chip, Divider, Stack, Typography } from '@mui/material';

import CardCell from './card-cell';
import ChipInputType from './chip-input-type';

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
              <ChipInputType type={item[column2]} />
            ) : (
              item[column2]
            )}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
