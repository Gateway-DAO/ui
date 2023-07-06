import {
  ChangeEvent,
  MouseEvent,
  PropsWithChildren,
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
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { InvalidatedWallet, ValidatedWallet } from './types';
import { UserListItemEdit } from '@/components/molecules/user-list-item-edit';
import { Data } from 'aws-sdk/clients/firehose';
import { menuItemClasses } from '@mui/material/MenuItem';

export function DirectWalletsList({
  invalidList,
  validList,
  searchContainer: SearchContainer,
  containerProps,
  listContainerProps,
  listProps,
  listItemProps,
}: Required<Pick<VerifyCsvProgressOutput, 'validList' | 'invalidList'>> & {
  searchContainer?: (props: PropsWithChildren<unknown>) => JSX.Element;
  containerProps?: StackProps;
  listContainerProps?: BoxProps;
  listProps?: Partial<VirtuosoProps<any, any>>;
  listItemProps?: Partial<ListItemProps>;
}) {
  const [filter, setFilter] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };
  console.log(validList, invalidList);
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const columns = ['RECIPIENT ID', 'TYPE', 'STATUS'];

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

  const VirtuosoTableComponents: TableComponents<Data> = {
    Scroller: forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => <Table {...props} sx={{}} />,
    TableHead,
    TableRow: ({ ...props }) => <TableRow {...props} />,
    TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function rowContent(index: number, row: any) {
    console.log(row);
    const { wallet, type, invalid } = row;
    return (
      <>
        <TableCell align={'left'}>{wallet}</TableCell>
        <TableCell align={'left'}>
          <Chip variant="outlined" color="info" label={type} />
        </TableCell>
        <TableCell align={'right'}>
          {invalid ? (
            <Chip variant="outlined" color="error" label="Invalid" />
          ) : (
            <Chip variant="outlined" color="success" label="Valid" />
          )}
        </TableCell>
        <TableCell align={'right'}>
          <IconButton
            sx={{
              p: 0,
            }}
            onClick={handleClick}
          >
            <Avatar sx={{ height: '30px', width: '31px' }}>
              <MoreVertIcon />
            </Avatar>
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover>
        </TableCell>
      </>
    );
  }

  return (
    <Stack gap={3} sx={{ height: '100%' }} {...containerProps}>
      {SearchContainer ? (
        <SearchContainer>{searchInput}</SearchContainer>
      ) : (
        searchInput
      )}
      <Box {...listContainerProps}>
        {/* <Virtuoso
          style={{ height: Math.min(400, whitelistedWallets.length * 61) }}
          data={whitelistedWallets}
          itemContent={(index, whitelisted) => {
            return (
              <>
                <UserListItemEdit
                  recipientId={
                    whitelisted.ens ? whitelisted.ens : whitelisted.wallet
                  }
                  invalid={whitelisted.invalid}
                  {...listItemProps}
                />
                {index !== whitelistedWallets.length - 1 && <Divider />}
              </>
            );
          }}
          {...listProps}
        /> */}
        <TableVirtuoso
          data={whitelistedWallets}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
          components={VirtuosoTableComponents}
          style={{ height: Math.min(400, whitelistedWallets.length * 61) }}
        />
      </Box>
    </Stack>
  );
}
