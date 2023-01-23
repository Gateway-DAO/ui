import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { alpha, Typography, Stack } from '@mui/material';

import { DataModel } from '../../../../../../services/gateway-protocol/types';
import DataModelField from './data-model-field';

type Props = {
  dataModel: PartialDeep<DataModel>;
};

export default function DataModelForm({ dataModel }: Props) {
  console.log(dataModel);
  return (
    <>
      <Typography fontWeight={600}>Set claims</Typography>
      <Typography
        fontSize={14}
        sx={{ color: alpha(brandColors.white.main, 0.7), mb: 3 }}
      >
        Set the claims that will define your credential
      </Typography>
      <Stack gap={2}>
        <DataModelField type="string" label="Name" />
        <DataModelField
          type="number"
          label="GPA"
          caption="Lorem ipsum dolor sit amet"
        />
      </Stack>
    </>
  );
}
