import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack } from '@mui/material';

import { DataModel } from '../../../../../../services/gateway-protocol/types';
import DataGrid from './data-grid';

type Props = {
  dataModel: PartialDeep<DataModel>;
  columns: any[];
  rows: any[];
};

export default function GridViewTab({ dataModel, columns, rows }: Props) {
  const { t } = useTranslation('protocol');
  return (
    <>
      <Stack
        sx={{ maxWidth: '726px', pt: 2, py: 3, px: { xs: 0, md: 4, lg: 6 } }}
      >
        Filter
      </Stack>
      <Stack>
        <DataGrid columns={columns} />
      </Stack>
    </>
  );
}
