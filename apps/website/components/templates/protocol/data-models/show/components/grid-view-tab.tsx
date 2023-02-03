import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack } from '@mui/material';

import {
  gatewayProtocolSDK,
  GatewayProtocolSDKTypes,
} from '../../../../../../services/gateway-protocol/api';
import { DataModel } from '../../../../../../services/gateway-protocol/types';
import Loading from '../../../../../atoms/loading';
import DataGrid from './data-grid';

type Props = {
  dataModel: PartialDeep<DataModel>;
  columns: any[];
  queryString: string;
  queryFnName: keyof GatewayProtocolSDKTypes;
  pageSize?: number;
};

export default function GridViewTab({
  dataModel,
  columns,
  queryString,
  queryFnName,
  pageSize,
}: Props) {
  const { t } = useTranslation('protocol');
  const internalPageSize = pageSize || 10;

  const {
    data: credentials,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryString, dataModel.id],
    async ({ pageParam }) => {
      const result = await gatewayProtocolSDK[queryFnName]({
        dataModelId: dataModel.id,
        take: internalPageSize,
        skip: pageParam || 0,
      } as any);
      return result[queryFnName];
    },
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.length < internalPageSize
          ? undefined
          : pages.length * internalPageSize,
    }
  );

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.05) {
        fetching = true;
        await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Stack sx={{ py: 15 }}>
          <Stack>
            <DataGrid columns={columns} data={credentials} />
            {isFetchingNextPage && <Loading />}
          </Stack>
        </Stack>
      )}
    </>
  );
}
