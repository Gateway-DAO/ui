import useTranslation from 'next-translate/useTranslation';
import { Suspense } from 'react';

import { useQuery } from '@tanstack/react-query';
import Loading from 'apps/website/components/atoms/loading';
import { gatewayProtocolSDK } from 'apps/website/services/gateway-protocol/api';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Box, CircularProgress, Stack } from '@mui/material';

import { DataModel } from '../../../../../../services/gateway-protocol/types';
import DataGrid from './data-grid';

type Props = {
  dataModel: PartialDeep<DataModel>;
  columns: any[];
  queryString: string;
  queryFnName: string;
};

export default function GridViewTab({
  dataModel,
  columns,
  queryString,
  queryFnName,
}: Props) {
  const { t } = useTranslation('protocol');

  const { data: credentials, isLoading } = useQuery(
    [queryString, dataModel.id],
    ({ pageParam = 0 }) =>
      gatewayProtocolSDK[queryFnName]({
        dataModelId: dataModel.id,
        offset: pageParam,
      })
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Stack sx={{ py: 15 }}>
          <Stack>
            <DataGrid columns={columns} data={credentials[queryFnName]} />
          </Stack>
        </Stack>
      )}
    </>
  );
}
