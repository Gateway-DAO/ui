import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, Paper, Divider, Typography } from '@mui/material';

import { DataModel } from '../../../../../../services/gateway-protocol/types';
import { schemaStringToJson } from '../../../../../../utils/map-object';
import CardCell from '../../../components/card-cell';

type Props = {
  title: string;
  data: any[];
  dataModel: PartialDeep<DataModel>;
};

export default function DataTableClaim({ title, data, dataModel }: Props) {
  console.log('asdfasdf', dataModel);
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
        {Object.keys(data)?.map((item, index) => {
          const schemaFields = schemaStringToJson(
            dataModel?.schema
          )?.properties;
          return (
            <CardCell
              key={index}
              label={schemaFields[item]?.title}
              margin={false}
              py={3}
            >
              {data[item]}
            </CardCell>
          );
        })}
      </Stack>
    </Paper>
  );
}
