import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { ReactNode } from 'react';

import { DateTime } from 'luxon';

import { limitCharsCentered } from '@gateway/helpers';
import { brandColors } from '@gateway/theme';

import VerifiedIcon from '@mui/icons-material/Verified';
import { Typography, Avatar, Tooltip, Chip } from '@mui/material';
import { alpha, Stack, Box } from '@mui/material';

import NetworkTransactionLink from '../../../../../atoms/network-transaction-link';
import { CategoriesList } from '../../../../../molecules/categories-list';

export interface IColumnGrid {
  header_name: string;
  column_name: ColumnType;
  valueGetter?: (params: any) => string;
  field?: string;
}

type Props = {
  columns: IColumnGrid[];
  data: {
    pages: any[]; // [ ] Add interface/type
  };
};

type ColumnType =
  | 'credential_id'
  | 'category'
  | 'issuer_id'
  | 'recipient_id'
  | 'issuance_date'
  | 'status'
  | 'default'
  | 'minted';

type Column = {
  field: string;
  column_name: ColumnType;
  cell?: (params: any) => ReactNode;
  valueGetter?: (params: any) => string;
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

const defineCols = (columns: IColumnGrid[]) => {
  const allColumns: Column[] = [
    {
      field: 'credential_id',
      column_name: 'credential_id',
      cell: (params) => (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Image
            src="/images/qr-code-blur.png" //[ ] Remove mock
            alt="QR Code"
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
      column_name: 'category',
      cell: (params) => (
        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <Stack sx={{ maxWidth: '150px' }}>
            {params.tags && params.tags.length > 0 && (
              <CategoriesList categories={params.tags} />
            )}
          </Stack>
        </Box>
      ),
    },
    {
      field: 'issuer_id',
      column_name: 'issuer_id',
      cell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar
            alt="Name"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1024px-Harvard_shield_wreath.svg.png" //[ ] Remove mock
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
              {/* [ ] Remove mock */}
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
      column_name: 'recipient_id',
      cell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar
            alt="Name"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1024px-Harvard_shield_wreath.svg.png" //[ ] Remove mock
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
            {/* [ ] Remove mock */}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'createdAt',
      column_name: 'issuance_date',
      valueGetter: (params) =>
        DateTime.fromISO(params.createdAt).toFormat('MMM dd, yyyy'),
    },
    {
      field: 'status',
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
      column_name: 'minted',
      cell: (params) => (
        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <NetworkTransactionLink url="#">
            {/* [ ] Remove mock */}
            <Image
              src="/images/polygon-icon.svg"
              alt="Polygon icon"
              width={13}
              height={11}
            />
          </NetworkTransactionLink>
          <NetworkTransactionLink url="#">
            {/* [ ] Remove mock */}

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

  return columns.map((column) => {
    const i = allColumns.findIndex(
      (pColumn) => pColumn.column_name === column.column_name
    );
    if (i > -1) {
      return {
        ...column,
        ...allColumns[i],
      };
    }
    return { ...column };
  });
};

export default function DataGrid({ columns, data }: Props): JSX.Element {
  const { t } = useTranslation('protocol');

  const gridColumns = defineCols(columns);
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr', //[ ] This size should be dynamic
          px: { xs: 0, md: 4, lg: 6 },
          minWidth: '1200px',
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
            {column.header_name}
          </Typography>
        ))}
      </Box>
      {data.pages && data.pages.length > 0 && (
        <>
          {data.pages.map((page) => (
            <>
              {page.map((row, rowIndex) => (
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
                      gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr', //[ ] This size should be dynamic
                    }}
                  >
                    {gridColumns.map((column) => (
                      <>
                        {column.cell ? ( // [ ] Check this property issue
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
                              {column.valueGetter
                                ? column.valueGetter(row)
                                : row[column.field]}
                            </Typography>
                          </Box>
                        )}
                      </>
                    ))}
                  </Box>
                </Box>
              ))}
            </>
          ))}
        </>
      )}
    </>
  );
}
