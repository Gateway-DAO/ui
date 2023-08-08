import { useEffect } from 'react';

import Loading from '@/components/atoms/loadings/loading';
import CredentialCard from '@/components/molecules/cards/credential-card';
import { query } from '@/constants/queries';
import { hasuraPublicService } from '@/services/hasura/api';
import { Users } from '@/services/hasura/types';
import { TOKENS } from '@/theme';
import { SessionUser } from '@/types/user';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { Box, Stack } from '@mui/material';

type Props = {
  user: PartialDeep<Users> | SessionUser;
};

export default function IssuedTab({ user }: Props): JSX.Element {
  const internalPageSize = 16;

  const {
    data: credentials,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [
      query.credentialsByIssuerUser,
      (user as PartialDeep<Users>).protocolUser?.id,
    ],
    async ({ pageParam }) => {
      const result =
        await hasuraPublicService.protocol_find_credentials_by_issuer_user({
          issuerUserId: (user as PartialDeep<Users>).protocolUser?.id,
          take: internalPageSize,
          skip: pageParam || 0,
        } as any);
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
    //[ ] use virtualization scroll
    let fetching = false;
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.3) {
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
    <Stack sx={{ py: 5, paddingBottom: 30 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 2,
              px: TOKENS.CONTAINER_PX,
            }}
          >
            {credentials &&
              credentials.pages &&
              credentials.pages.length > 0 &&
              credentials.pages.map((page) => (
                <>
                  {page.map((credential) => (
                    <CredentialCard key={credential.id} {...credential} />
                  ))}
                </>
              ))}
          </Box>
          <Box>{isFetchingNextPage && <Loading />}</Box>
        </>
      )}
    </Stack>
  );
}
