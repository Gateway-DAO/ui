import { Stack, Paper, Divider, Typography } from '@mui/material';

import CardCell from '../../../components/card-cell';

type Props = {
  title: string;
  data: any[];
};

export default function DataTableClaim({ title, data }: Props) {
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
        {Object.keys(data)?.map((item, index) => (
          <CardCell key={index} label={item} margin={false} py={3}>
            {data[item]}
          </CardCell>
        ))}
      </Stack>
    </Paper>
  );
}
