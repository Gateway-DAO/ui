import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, Paper, Typography, Divider } from '@mui/material';

import { CredentialData } from '../../../../../../services/gateway-protocol/types';
import CardCell from '../../../components/card-cell';

type Props = {
  title: string;
  data: PartialDeep<CredentialData>[];
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
          <Stack key={index} direction="row" justifyContent="space-between">
            <CardCell label={item.label} margin={false} py={3}>
              {`${item.value}`}
            </CardCell>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
