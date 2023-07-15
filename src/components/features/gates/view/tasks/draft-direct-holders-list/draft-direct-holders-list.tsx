import { ClientNav } from '@/components/organisms/navbar/client-nav';
import { useAuth } from '@/providers/auth';
import { Gates } from '@/services/hasura/types';
import { TOKENS } from '@/theme';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { Box, CircularProgress, Grid, Stack } from '@mui/material';

import {
  DirectWalletsHeader,
  DirectWalletsVerifyingHeader,
} from '../../../create/tasks/direct/direct-wallets-header';
import { DirectWalletsList } from '../../../create/tasks/direct/direct-wallets-lists';
import { DirectWalletsProgress } from '../../../create/tasks/direct/fields/direct-wallets-progress';

type Props = {
  gate: PartialDeep<Gates>;
};

export function DraftDirectHoldersList({ gate }: Props) {
  const { hasuraUserService } = useAuth();

  const file = gate.whitelisted_wallets_file;

  const progressReq = useInfiniteQuery(
    ['progress', file?.id],
    () => hasuraUserService.verify_csv_progress({ file_id: file?.id }),
    {
      enabled: !!file?.id,
      keepPreviousData: false,
      refetchInterval: (data) =>
        !data?.pages[0].verify_csv_progress.isDone && 1000,
    }
  );

  const progress = progressReq.data?.pages?.[0]?.verify_csv_progress;

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

      {progress?.isDone ? (
        <>
          <Box
            sx={{
              px: TOKENS.CONTAINER_PX,
              pb: 2,
            }}
          >
            {/* <DirectWalletsHeader
              validWallets={progress.valid}
              invalidWallets={progress.invalid}
            /> */}
          </Box>
          {/* <DirectWalletsList
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
            listProps={{
              style: {
                height: '100%',
              },
            }}
            listContainerProps={{
              sx: {
                height: {
                  xs: 'calc(100vh - 112px)',
                  md: '100%',
                },
              },
            }}
            listItemProps={{
              sx: {
                px: TOKENS.CONTAINER_PX,
              },
            }}
          /> */}
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

      {progressReq.isLoading && (
        <CircularProgress sx={{ mt: 4, alignSelf: 'center' }} />
      )}
    </Grid>
  );
}
