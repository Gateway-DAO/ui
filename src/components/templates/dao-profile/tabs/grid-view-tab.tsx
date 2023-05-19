import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { Stack } from '@mui/material';

import {
  gatewayProtocolSDK,
  GatewayProtocolSDKTypes,
} from '@/services/gateway-protocol/api';
import Loading from '@/components/atoms/loading';
import DataGrid from '@/components/organisms/data-grid/data-grid';
import { useDaoProfile } from '../context';

type Props = {
  columns: any[]; //[ ] add interface/type
  queryString: string;
  queryFnName: keyof GatewayProtocolSDKTypes;
  pageSize?: number;
  parameterName?: string;
};

export default function GridViewTab({
  columns,
  queryString,
  queryFnName,
  pageSize,
  parameterName,
}: Props) {
  const { t } = useTranslation('protocol');
  const { dao } = useDaoProfile();
  const internalPageSize = pageSize || 10;
  const {
    data: credentials, //[ ] Rename this data credentials
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryString, dao.protocolOrganization?.id],
    async ({ pageParam }) => {
      const result = await gatewayProtocolSDK[queryFnName]({
        [parameterName || 'organizationId']: dao.protocolOrganization?.id,
        take: internalPageSize,
        skip: pageParam || 0,
      } as any); //[ ] add interface/type
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
        <Stack sx={{ pb: 15, pt: 5 }}>
          <Stack>
            <DataGrid columns={columns} data={credentials} />
            {isFetchingNextPage && <Loading />}
          </Stack>
        </Stack>
      )}
    </>
  );
}
