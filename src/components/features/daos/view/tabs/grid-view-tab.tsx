import { useEffect } from 'react';

import Loading from '@/components/atoms/loadings/loading';
import DataGrid from '@/components/organisms/data-grid/data-grid';
import { hasuraPublicService } from '@/services/hasura/api';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Stack } from '@mui/material';

import { useDaoProfile } from '../context';

type Props = {
  columns: any[]; //[ ] add interface/type
  queryString: string;
  pageSize?: number;
};

export default function GridViewTab({ columns, queryString, pageSize }: Props) {
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
      const result =
        await hasuraPublicService.protocol_find_credentials_by_issuer_organization(
          {
            issuerOrganizationId: dao.protocolOrganization?.id,
            take: internalPageSize,
            skip: pageParam || 0,
          }
        ); //[ ] add interface/type
      return result.protocol_credential;
    },
    {
      getNextPageParam: (lastPage = [], pages) =>
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
