import Image from 'next/image';
import { ReactNode } from 'react';

import NetworkTransactionLink from 'apps/website/components/atoms/network-transaction-link';
import { CategoriesList } from 'apps/website/components/molecules/categories-list';
import { DateTime } from 'luxon';

import { limitCharsCentered } from '@gateway/helpers';
import { brandColors } from '@gateway/theme';

import VerifiedIcon from '@mui/icons-material/Verified';
import { Typography, Avatar, Tooltip, Chip } from '@mui/material';
import { alpha, Stack, Box } from '@mui/material';

type Props = {
  columns: ColumnType[];
  data: any[];
};

type ColumnType =
  | 'credential_id'
  | 'category'
  | 'issuer_id'
  | 'recipient_id'
  | 'issuance_date'
  | 'status'
  | 'minted';

type Column = {
  field: string;
  headerName: string;
  column_name: ColumnType;
  cell?: (params: any) => ReactNode;
  valueGetter?: (params: any) => any;
  minWidth?: number;
  width?: number;
};

const setColorStatus = (status: 'Valid' | 'Invalid' | string): string => {
  switch (status) {
    case 'Valid':
      return brandColors.green.main;

    case 'Revoked' || 'Expired':
      return brandColors.orange.main;

    case 'Invalid':
      return brandColors.red.main;

    default:
      return brandColors.orange.main;
  }
};

const defineCols = (columns: ColumnType[]) => {
  const allColumns: Column[] = [
    {
      field: 'credential_id',
      headerName: 'Credential ID',
      column_name: 'credential_id',
      cell: (params) => (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Image
            src="/images/qr-code-blur.png"
            alt="QR code"
            width="56"
            height="56"
          />
          <Box>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '14px',
                letterSpacing: '0.17px',
                color: alpha(brandColors.white.main, 0.7),
              }}
            >
              ID {limitCharsCentered(params.id, 6)}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '16px',
                letterSpacing: '0.15px',
                color: brandColors.white.main,
              }}
            >
              {params.title}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      column_name: 'category',
      cell: (params) => (
        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <Stack sx={{ maxWidth: '150px' }}>
            <CategoriesList
              listMode
              categories={['Education', 'NFT', 'VCs', 'University']}
            />
            {/* <CategoriesList categories={params.tags} /> */}
          </Stack>
        </Box>
      ),
    },
    {
      field: 'issuer_id',
      headerName: 'Issuer ID',
      column_name: 'issuer_id',
      cell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar
            alt="Name"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1024px-Harvard_shield_wreath.svg.png"
            sx={{ width: 24, height: 24 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '0.17px',
                maxWidth: '70px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {params.issuer?.id || 'Dummy name'}
            </Typography>
            <Tooltip title="Tooltip message">
              <VerifiedIcon sx={{ color: brandColors.purple.main }} />
            </Tooltip>
          </Box>
        </Box>
      ),
    },
    {
      field: 'recipient_id',
      headerName: 'Recipient ID',
      column_name: 'recipient_id',
      cell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar
            alt="Name"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1024px-Harvard_shield_wreath.svg.png"
            sx={{ width: 24, height: 24 }}
          />
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.17px',
            }}
          >
            username
          </Typography>
        </Box>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Issuance Date',
      column_name: 'issuance_date',
      valueGetter: (params) =>
        DateTime.fromISO(params.createdAt).toFormat('MM/dd/yy, HH:mm a'),
    },
    {
      field: 'status',
      headerName: 'Status',
      column_name: 'status',
      cell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip
            variant="outlined"
            label={params.status}
            sx={{
              color: setColorStatus(params.status),
              borderColor: setColorStatus(params.status),
            }}
          />
        </Box>
      ),
    },
    {
      field: 'minted',
      headerName: 'Minted',
      column_name: 'minted',
      cell: (params) => (
        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <NetworkTransactionLink url="#">
            <Image
              src="/images/polygon-icon.svg"
              alt="Polygon icon"
              width={13}
              height={11}
            />
          </NetworkTransactionLink>
          <NetworkTransactionLink url="#">
            <Image
              src="/images/solana-icon.svg"
              alt="Polygon icon"
              width={13}
              height={11}
            />
          </NetworkTransactionLink>
        </Box>
      ),
    },
  ];

  return allColumns
    .filter((column) => columns.includes(column.column_name))
    .sort(
      (a, b) => columns.indexOf(a.column_name) - columns.indexOf(b.column_name)
    );
};

export default function DataGrid({ columns, data }: Props): JSX.Element {
  const gridColumns = defineCols(columns);
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr',
          px: { xs: 0, md: 4, lg: 6 },
        }}
      >
        {gridColumns.map((column) => (
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.17px',
              color: alpha(brandColors.white.main, 0.7),
              textTransform: 'uppercase',
            }}
            key={column.field}
          >
            {column.headerName}
          </Typography>
        ))}
      </Box>
      {data.length > 0 && (
        <>
          {data.map((row, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                borderBottom: '1px solid',
                borderColor: alpha(brandColors.grays.main, 0.12),
                py: 3,
              }}
            >
              <Box
                key={rowIndex}
                sx={{
                  px: { xs: 0, md: 4, lg: 6 },
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr',
                }}
              >
                {gridColumns.map((column) => (
                  <>
                    {column.cell ? (
                      <>{column.cell(row)}</>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: '400',
                            letterSpacing: '0.17px',
                          }}
                        >
                          {column.valueGetter(row) || row[column.field]}
                        </Typography>
                      </Box>
                    )}
                  </>
                ))}
              </Box>
            </Box>
          ))}
        </>
      )}
    </>
  );
}
