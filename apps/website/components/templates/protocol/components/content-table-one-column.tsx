import { Divider, Stack } from '@mui/material';

import CardCell from './card-cell';

type Props = {
  data: any[];
};

export default function ContentTableOneColumn({ data }: Props) {
  return (
    <Stack divider={<Divider />}>
      {data?.map((item, index) => (
        <Stack key={index} direction="row" justifyContent="space-between">
          <CardCell label={item.name} margin={false} py={3}>
            {`${item.value}`}
          </CardCell>
        </Stack>
      ))}
    </Stack>
  );
}