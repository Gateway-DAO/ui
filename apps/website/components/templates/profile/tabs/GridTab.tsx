import { useEffect } from 'react';

import { PartialDeep } from 'type-fest';
import { useInfiniteQuery } from 'wagmi';

import { Stack } from '@mui/material';

import {
  gatewayProtocolSDK,
  GatewayProtocolSDKTypes,
} from '../../../../services/gateway-protocol/api';
import { Users } from '../../../../services/hasura/types';
import { SessionUser } from '../../../../types/user';
import Loading from '../../../atoms/loading';
import DataGrid from '../../../organisms/data-grid/data-grid';

type Props = {
  user: PartialDeep<Users> | SessionUser;
  columns: any[]; //[ ] add interface/type
  queryString: string;
  queryFnName: keyof GatewayProtocolSDKTypes;
  pageSize?: number;
};

export function GridTab({
  user,
  columns,
  queryString,
  queryFnName,
  pageSize,
}: Props): JSX.Element {
  const internalPageSize = pageSize || 10;

  const {
    data: gridData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryString, user.id],
    async ({ pageParam }) => {
      const result = await gatewayProtocolSDK[queryFnName]({
        issuerUserId: user.id,
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
        <Stack sx={{ py: 10 }}>
          <Stack>
            <DataGrid
              columns={[
                {
                  column_name: 'default',
                  header_name: 'Header1',
                  field: 'test',
                },
                {
                  column_name: 'default',
                  header_name: 'Header2',
                  field: 'test2',
                },
                {
                  column_name: 'default',
                  header_name: 'Header3',
                  field: 'test3',
                },
              ]}
              data={{
                pages: [
                  [
                    {
                      test: 'Abublé',
                      test2: 'Akjhask',
                      test3: 'Aiuhlklklkslklk----',
                    },
                    {
                      test2: 'Abublé',
                      test3: 'Akjhask',
                      test: 'Aiuhlklklkslklk----',
                    },
                  ],
                ],
              }}
            />
            {/* <DataGrid columns={columns} data={gridData} /> */}
            {isFetchingNextPage && <Loading />}
          </Stack>
        </Stack>
      )}
    </>
  );
}
