import { useInfiniteQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Box, CircularProgress, Grid, Stack } from '@mui/material';

import { useAuth } from '../../../../providers/auth';
import { gqlUserHeader } from '../../../../services/api';
import { Gates } from '../../../../services/graphql/types.generated';
import { ClientNav } from '../../../organisms/navbar/client-nav';
import {
  DirectWalletsHeader,
  DirectWalletsVerifyingHeader,
} from '../../create-gate/tasks/direct/direct-wallets-header';
import { DirectWalletsList } from '../../create-gate/tasks/direct/direct-wallets-lists';
import { DirectWalletsProgress } from '../../create-gate/tasks/direct/fields/direct-wallets-progress';
import { ProgressVerifyCSV } from '../../create-gate/tasks/direct/types';

type Props = {
  gate: PartialDeep<Gates>;
};

export function DraftDirectHoldersList({ gate }: Props) {
  const { me, token } = useAuth();

  const file = gate.whitelisted_wallets_file;

  const progressReq = useInfiniteQuery(
    ['progress', file?.id],
    async (): Promise<ProgressVerifyCSV> => {
      const res = await fetch(
        `http://localhost:8080/test/progress?id=${file?.id}`,
        {
          method: 'GET',
          headers: gqlUserHeader(token, me?.id),
        }
      );
      return res.json();
    },
    {
      enabled: !!file?.id,
      keepPreviousData: false,
      refetchInterval: (data) => !data?.pages[0].isDone && 1000,
    }
  );

  const progress = progressReq.data?.pages[0];

  return (
    <Grid display="flex" flexDirection="column" item xs={12} md>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          height: (theme) => theme.spacing(7),
          px: TOKENS.CONTAINER_PX,
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <ClientNav />
      </Stack>

      {progressReq.isLoading && <CircularProgress />}

      {progress?.isDone ? (
        <>
          <Box
            sx={{
              px: TOKENS.CONTAINER_PX,
              pb: 2,
            }}
          >
            <DirectWalletsHeader
              validWallets={progress.valid}
              invalidWallets={progress.invalid}
            />
          </Box>
          <DirectWalletsList
            invalidList={progress.invalidList}
            validList={progress.validList}
            searchContainer={({ children }) => (
              <Box
                sx={{
                  px: TOKENS.CONTAINER_PX,
                }}
              >
                {children}
              </Box>
            )}
          />
        </>
      ) : (
        <Stack
          sx={{
            px: TOKENS.CONTAINER_PX,
          }}
          gap={3}
        >
          <DirectWalletsVerifyingHeader total={file?.metadata?.total} />
          <DirectWalletsProgress total={file?.metadata?.total} {...progress} />
        </Stack>
      )}
    </Grid>
  );
}
