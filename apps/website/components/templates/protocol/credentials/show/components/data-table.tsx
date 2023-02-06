import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, Paper, Typography, Divider, Box, alpha } from '@mui/material';

import { CredentialData } from '../../../../../../services/gateway-protocol/types';
import CardCell from '../../../components/card-cell';
import { claimFields } from '../../create/components/ClaimTypes';
import { ImageView } from './image-view';
import { ListView } from './list-view';

type Props = {
  title: string;
  data: PartialDeep<CredentialData>[];
};

function ClaimView(fieldData: PartialDeep<CredentialData>) {
  switch (fieldData.type) {
    case claimFields.image:
      return <ImageView {...fieldData} />;
    case claimFields.array:
      return <ListView {...fieldData} />;
    default:
      return <span>{fieldData.value}</span>;
  }
}

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
        {data?.map((fieldData, index) => (
          <Stack key={index} direction="row" justifyContent="space-between">
            <CardCell label={fieldData?.label} margin={false} py={3}>
              <ClaimView {...fieldData} />
            </CardCell>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
