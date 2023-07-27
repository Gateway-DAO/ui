import {
  ChangeEvent,
  MouseEvent,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';

import { VerifyCsvProgressOutput } from '@/services/hasura/types';
import { TableVirtuoso, VirtuosoProps } from 'react-virtuoso';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import SearchIcon from '@mui/icons-material/Search';
import {
  Stack,
  InputAdornment,
  TextField,
  Chip,
  ListItemProps,
  StackProps,
  Box,
  BoxProps,
  Popover,
  Typography,
  TableRow,
  TableCell,
  IconButton,
  Avatar,
  Button,
} from '@mui/material';

import { InvalidatedWallet, ValidatedWallet } from './types';
import { useFormContext } from 'react-hook-form';
import { AddRecipientDirectCredentialSchema } from './direct-wallets';
import { Edit, Delete, Email } from '@mui/icons-material';
import { EthereumIcon } from '@/components/atoms/icons';

export function DirectWalletsList({
  invalidList,
  validList,
  searchContainer: SearchContainer,
  containerProps,
  listContainerProps,
  listProps,
  listItemProps,
  setAddRecipient,
  skipAddRecipient,
}: Required<Pick<VerifyCsvProgressOutput, 'validList' | 'invalidList'>> & {
  searchContainer?: (props: PropsWithChildren<unknown>) => JSX.Element;
  containerProps?: StackProps;
  listContainerProps?: BoxProps;
  listProps?: Partial<VirtuosoProps<any, any>>;
  listItemProps?: Partial<ListItemProps>;
  setAddRecipient: (nextValue?: any) => void;
  skipAddRecipient?: boolean;
}) {
  const [filter, setFilter] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const whitelistedWallets = useMemo(() => {
    const wallets: {
      wallet: string;
      ens?: string;
      invalid?: boolean;
    }[] = [
      ...(invalidList?.reduce((acc, string) => {
        let obj: InvalidatedWallet = JSON.parse(string);
        obj = { ...obj, invalid: true };
        if (!filter.length) {
          return [...acc, obj];
        }
        const { wallet } = obj;
        return wallet.toLowerCase().includes(filter.toLowerCase())
          ? [...acc, obj]
          : acc;
      }, []) ?? []),
      ...(validList?.reduce((acc, string) => {
        const obj: ValidatedWallet = JSON.parse(string);
        if (!filter.length) {
          return [...acc, obj];
        }
        const { wallet } = obj;
        return wallet.toLowerCase().includes(filter.toLowerCase())
          ? [...acc, obj]
          : acc;
      }, []) ?? []),
    ];
    return wallets;
  }, [filter, invalidList, validList]);

  const searchInput = (
    <TextField
      label="Search"
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
            <SearchIcon
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
  );

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { setValue } = useFormContext<AddRecipientDirectCredentialSchema>();

  const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
    wallet: string,
    type: string
  ) => {
    setValue('addNew', false);
    setValue('oldType', type);
    setValue('oldWallet', wallet);
    setValue('type', type);
    setValue('wallet', wallet);

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const columns = ['RECIPIENT ID', 'TYPE', 'STATUS', ''];

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column}
            variant="head"
            align={'left'}
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

  function rowContent(index: number, row: any) {
    const { wallet, type, invalid, duplicate } = row;
    return (
      <div key={index}>
        <TableCell align={'left'}>{wallet}</TableCell>
        <TableCell align={'left'}>
          <Chip
            variant="filled"
            color="default"
            label={type}
            icon={type === 'Email' ? <Email /> : <EthereumIcon />}
          />
        </TableCell>
        <TableCell align={'right'}>
          {duplicate ? (
            <Chip variant="outlined" color="primary" label="Duplicate" />
          ) : invalid ? (
            <Chip variant="outlined" color="error" label="InValid" />
          ) : (
            <Chip variant="outlined" color="success" label="Valid" />
          )}
        </TableCell>
        {!skipAddRecipient && (
          <TableCell align={'right'}>
            <IconButton
              sx={{
                p: 0,
              }}
              onClick={(e) => handleClick(e, wallet, type)}
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
                <Button>
                  <Delete color="secondary" sx={{ mr: 2 }} />
                  <Typography variant="subtitle2">Remove</Typography>
                </Button>
                <Button
                  onClick={() => {
                    setAddRecipient();
                  }}
                >
                  <Edit color="secondary" sx={{ mr: 2.5 }} />{' '}
                  <Typography variant="subtitle2">Edit</Typography>
                </Button>
              </Stack>
            </Popover>
          </TableCell>
        )}
      </div>
    );
  }

  return (
    <>
      <Stack gap={3} sx={{ height: '100%' }} {...containerProps}>
        {SearchContainer ? (
          <SearchContainer>{searchInput}</SearchContainer>
        ) : (
          <>{searchInput}</>
        )}
        <Box
          {...listContainerProps}
          sx={{
            table: {
              width: '100%',
              height: '100%',
            },
            height: '100%',
          }}
        >
          <TableVirtuoso
            id="table-virtuoso-test"
            data={whitelistedWallets}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
            style={{
              height:
                whitelistedWallets.length <= 3
                  ? 200
                  : Math.min(400, whitelistedWallets.length * 61),
            }}
          />
        </Box>
      </Stack>
    </>
  );
}
