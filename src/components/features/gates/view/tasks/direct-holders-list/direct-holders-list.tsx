import useTranslation from 'next-translate/useTranslation';
import { ChangeEvent, useState, MouseEvent } from 'react';

import { GateFilledIcon } from '@/components/atoms/icons';
import { CenteredLoader } from '@/components/atoms/loadings/centered-loader';
import { ClientNav } from '@/components/organisms/navbar/client-nav';
import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { hasuraPublicService } from '@/services/hasura/api';
import { Direct_Credential_InfoQuery, Gates } from '@/services/hasura/types';
import { TOKENS } from '@/theme';
import { UseQueryResult, useInfiniteQuery } from '@tanstack/react-query';
import { useWindowSize } from 'react-use';
import { TableVirtuoso } from 'react-virtuoso';
import { PartialDeep } from 'type-fest';

import { Close, Search } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AvatarFile } from '@/components/atoms/avatar-file';
import { DirectHoldersHeader } from './header';

type Props = {
  gate: PartialDeep<Gates>;
  isLoading: boolean;
  totalHolders: number;
  isAdmin: boolean;
  directCredentialInfo: UseQueryResult<Direct_Credential_InfoQuery, unknown>;
};

export function DirectHoldersList({
  gate,
  isLoading: isLoadingInfo,
  totalHolders,
  isAdmin,
  directCredentialInfo,
}: Props) {
  const { t } = useTranslation('credential');

  const windowSize = useWindowSize();
  const [nameDisplay, setNameDisplay] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { me } = useAuth();
  const [filter, setFilter] = useState('');

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch: refetchWhitelistedWallets,
  } = useInfiniteQuery(
    [query.direct_credentialholders, me?.wallet, gate.id, filter],
    ({ pageParam = 0 }) =>
      filter?.length
        ? hasuraPublicService.direct_credential_holders_search({
            gate_id: gate.id,
            offset: pageParam,
            search: `%${filter}%`,
          })
        : hasuraPublicService.direct_credential_holders({
            offset: pageParam,

            gate_id: gate.id,
          }),
    {
      enabled: isLoadingInfo && gate.type === 'direct',
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.whitelisted_wallets.length < 15) return undefined;
        return pages.length * 15;
      },
    }
  );

  const whitelistedWallets =
    data?.pages?.flatMap((page) => page.whitelisted_wallets) ?? [];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  if (isLoadingInfo) {
    return (
      <Grid display="flex" flexDirection="column" item xs={12} md>
        <CenteredLoader />
      </Grid>
    );
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const columns = ['CREDENTIAL ID', 'RECIPIENT ID', 'ISSUEANCE DATE', ''];

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column}
            variant="head"
            align={'center'}
            sx={{
              backgroundColor: 'background.paper',
            }}
          >
            {column}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function checkNameSize(name: string) {
    if (name.length > 11) {
      return name.slice(0, 10) + '...';
    }
    return name;
  }

  window.addEventListener('resize', () => {
    if (window.screen.width < 376) {
      setNameDisplay('slice');
    } else {
      setNameDisplay('full');
    }
  });

  const dateFormatAccordingToTimeZone = new Intl.DateTimeFormat('en-US', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeZoneName: 'short',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    year: '2-digit',
    month: '2-digit',
  });

  function rowContent(index: number, row: any) {
    const { wallet, gate, user, created_at } = row;
    return (
      <>
        <TableCell align={'center'}>
          <Stack direction={'row'} alignItems={'center'}>
            <Avatar>{gate?.image}</Avatar>
            <Stack direction={'column'} sx={{ ml: 1 }}>
              <Typography variant="subtitle1">
                {checkNameSize(gate?.id)}
              </Typography>
              <Typography>{gate?.title}</Typography>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell align={'center'}>
          <Stack direction={'row'} alignItems={'end'}>
            <AvatarFile
              file={user.picture}
              target="_blank"
              fallback="/avatar.png"
              sx={{ height: '24px', width: '24px', mr: 1.2 }}
            />
            {checkNameSize(wallet)}
          </Stack>
        </TableCell>
        <TableCell align={'center'}>
          {dateFormatAccordingToTimeZone.format(new Date(created_at))}
        </TableCell>
        <TableCell align={'center'}>
          <IconButton
            sx={{
              p: 0,
            }}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <Avatar sx={{ height: '30px', width: '31px' }}>
              <MoreVertIcon />
            </Avatar>
          </IconButton>
          <Popover
            id="mouse-over-popover"
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            onClose={() => setAnchorEl(null)}
            disableRestoreFocus
          >
            <Stack>
              <Button onClick={() => {}}>
                <Close color="secondary" sx={{ mr: 2.5 }} />{' '}
                <Typography variant="subtitle2">Revoke</Typography>
              </Button>
            </Stack>
          </Popover>
        </TableCell>
      </>
    );
  }
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

      <Box
        sx={{
          px: {
            ...TOKENS.CONTAINER_PX,
            lg: 7.5,
          },
          pb: 2,
        }}
      >
        {
          <DirectHoldersHeader
            gateId={gate.id}
            totalHolders={totalHolders}
            isAdmin={isAdmin}
            directCredentialInfo={directCredentialInfo}
            refetchWhitelistedWallets={refetchWhitelistedWallets}
          />
        }
        <TextField
          label="Search by Recipient ID"
          variant="outlined"
          size="small"
          onChange={handleChange}
          value={filter}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  paddingRight: 1,
                }}
              >
                <Search
                  sx={{
                    color: 'rgba(255, 255, 255, 0.56)',
                  }}
                />
              </InputAdornment>
            ),
            fullWidth: true,
            sx: {
              borderRadius: 100,
            },
            size: 'small',
          }}
        />
      </Box>

      <Box
        sx={{
          height: { lg: '100%', xs: '100vh' },
          ...(!totalHolders && {
            display: 'flex',
            alignSelf: 'center',
          }),
        }}
      >
        {!totalHolders && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 339,
              marginBottom: 20,
            }}
          >
            <Box
              sx={{
                height: 64,
                width: 64,
                padding: 3,
                borderRadius: '50%',
                background: '#9a53ff36',
              }}
            >
              <GateFilledIcon />
            </Box>

            <Typography variant="h6" textAlign={'center'} height={64} mt={2}>
              {t('direct-credential.eligibility.empty-whitelist')}
            </Typography>
          </Box>
        )}

        {isLoading ? (
          <CenteredLoader />
        ) : (
          <Box
            sx={{
              table: {
                width: '100%',
              },
              mx: 6,
            }}
          >
            <TableVirtuoso
              data={whitelistedWallets}
              fixedHeaderContent={fixedHeaderContent}
              itemContent={rowContent}
              style={{ height: windowSize.height }}
              endReached={() => {
                console.log('reached', hasNextPage);
                hasNextPage && fetchNextPage();
              }}
              components={{
                TableFoot: () =>
                  isFetchingNextPage ? <CenteredLoader /> : null,
              }}
            />
          </Box>
        )}
      </Box>
    </Grid>
  );
}
