import useTranslation from 'next-translate/useTranslation';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack } from '@mui/material';

import { DataModel } from '../../../../../../services/gateway-protocol/types';
import DataGrid from './data-grid';

type Props = {
  dataModel: PartialDeep<DataModel>;
  columns: any[];
  data: any[];
};

export default function GridViewTab({ dataModel, columns, data }: Props) {
  const { t } = useTranslation('protocol');

  // const credentials = useQuery([])
  return (
    <Stack sx={{ py: 15 }}>
      <Stack>
        <DataGrid columns={columns} data={data} />
      </Stack>
    </Stack>
  );
}
