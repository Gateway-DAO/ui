import { Stack, Paper, Divider, Typography } from '@mui/material';

import { MockDataItem } from '../credential-view';
import CardCell from './card-cell';

type Props = {
  title: string;
  data: MockDataItem[];
};

export default function DataTable({ title, data }: Props) {
  return (
    <Paper
      elevation={2}
      component={Stack}
      sx={{
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Typography sx={{ px: 2, pt: 2, fontWeight: 700 }}>{title}</Typography>
      <Stack divider={<Divider />}>
        {data?.map((item, index) => (
          <CardCell key={index} label={item.name} margin={false} py={3}>
            {item.value}
          </CardCell>
        ))}
      </Stack>
    </Paper>
  );
}
