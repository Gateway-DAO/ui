import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  PropsWithChildren,
  SetStateAction,
  forwardRef,
  useMemo,
  useState,
} from 'react';

import { UserListItem } from '@/components/molecules/user-list-item';
import { VerifyCsvProgressOutput } from '@/services/hasura/types';
import {
  TableComponents,
  TableVirtuoso,
  Virtuoso,
  VirtuosoProps,
} from 'react-virtuoso';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import SearchIcon from '@mui/icons-material/Search';
import {
  Stack,
  Divider,
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
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  IconButton,
  Avatar,
  Button,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { InvalidatedWallet, ValidatedWallet } from './types';
import { UserListItemEdit } from '@/components/molecules/user-list-item-edit';
import { Data } from 'aws-sdk/clients/firehose';
import { menuItemClasses } from '@mui/material/MenuItem';
import { useFormContext } from 'react-hook-form';
import { AddRecipientDirectCredentialSchema } from './direct-wallets';
import { Download, Edit, Delete, Email, Twitter } from '@mui/icons-material';

export function DirectWalletsList({
  invalidList,
  validList,
  searchContainer: SearchContainer,
  containerProps,
  listContainerProps,
  listProps,
  listItemProps,
  setAddRecipient,
}: Required<Pick<VerifyCsvProgressOutput, 'validList' | 'invalidList'>> & {
  searchContainer?: (props: PropsWithChildren<unknown>) => JSX.Element;
  containerProps?: StackProps;
  listContainerProps?: BoxProps;
  listProps?: Partial<VirtuosoProps<any, any>>;
  listItemProps?: Partial<ListItemProps>;
  setAddRecipient: (nextValue?: any) => void;
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
  const id = open ? 'simple-popover' : undefined;

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
      <>
        <TableCell align={'left'}>{wallet}</TableCell>
        <TableCell align={'left'}>
          <Chip
            variant="filled"
            color="default"
            label={type}
            icon={<Email />}
          />
        </TableCell>
        <TableCell align={'right'}>
          {duplicate ? (
            <Chip variant="outlined" color="error" label="Duplicate" />
          ) : invalid ? (
            <Chip variant="outlined" color="success" label="InValid" />
          ) : (
            <Chip variant="outlined" color="success" label="Valid" />
          )}
        </TableCell>
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
            sx={{}}
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
      </>
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
            },
          }}
        >
          <TableVirtuoso
            id="table-virtuoso-test"
            data={whitelistedWallets}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
            style={{
              height: Math.min(400, whitelistedWallets.length * 61),
            }}
          />
        </Box>
      </Stack>
    </>
  );
}
