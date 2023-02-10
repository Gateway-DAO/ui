import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Box, Stack } from '@mui/material';

import { query } from '../../../../constants/queries';
import { gatewayProtocolSDK } from '../../../../services/gateway-protocol/api';
import { Users } from '../../../../services/hasura/types';
import { SessionUser } from '../../../../types/user';
import Loading from '../../../atoms/loading';
import CredentialCard from '../../../molecules/credential-card';

type Props = {
  user: PartialDeep<Users> | SessionUser;
};

export default function ReceivedTab({ user }: Props): JSX.Element {
  const internalPageSize = 10;
  const {
    data: credentials,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [query.credentialsByRecipientUser, user.id],
    async ({ pageParam }) => {
      const result = await gatewayProtocolSDK.findCredentialsByRecipientUser({
        recipientUserId: user.id,
        take: internalPageSize,
        skip: pageParam || 0,
      } as any);
      return result.findCredentialsByRecipientUser;
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
                    <CredentialCard
                      isRecipient
                      key={credential.id}
                      {...credential}
                    />
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