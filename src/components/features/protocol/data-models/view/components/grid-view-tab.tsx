import { useEffect } from 'react';

import Loading from '@/components/atoms/loadings/loading';
import DataGrid from '@/components/organisms/data-grid/data-grid';
import { hasuraPublicService, GqlProtocolMethods } from '@/services/hasura/api';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Stack } from '@mui/material';

type Props = {
  dataModelId: string;
  columns: any[]; //[ ] add interface/type
  queryString: string;
  queryFnName: keyof GqlProtocolMethods;
  pageSize?: number;
};

export default function GridViewTab({
  dataModelId,
  columns,
  queryString,
  queryFnName,
  pageSize,
}: Props) {
  const internalPageSize = pageSize || 10;
  const {
    data: credentials, //[ ] Rename this data credentials
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryString, dataModelId],
    async ({ pageParam }) => {
      const result = await hasuraPublicService[queryFnName]({
        dataModelId: dataModelId,
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
