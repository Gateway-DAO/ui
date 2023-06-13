import { useEffect } from 'react';

import Loading from '@/components/atoms/loadings/loading';
import DataGrid from '@/components/organisms/data-grid/data-grid';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

import { Stack } from '@mui/material';

type Props = {
  dataModelId: string;
  columns: any[]; //[ ] add interface/type
  queryString: string;
  queryFn: (
    context: QueryFunctionContext<any>,
    pageSize: number
  ) => Promise<any[]>;
  querySelect?: (data: any) => any;
  pageSize?: number;
};

export default function GridViewTab({
  dataModelId,
  columns,
  queryString,
  queryFn,
  pageSize = 10,
}: Props) {
  const {
    data: credentials, //[ ] Rename this data credentials
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryString, dataModelId],
    (options) => queryFn(options, pageSize),
    {
      getNextPageParam: (lastPage: any = [], pages) =>
        lastPage.length < pageSize ? undefined : pages.length * pageSize,
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
