import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { ReactNode } from 'react';

import { DateTime } from 'luxon';

import { limitCharsCentered } from '@gateway/helpers';
import { brandColors } from '@gateway/theme';

import { Typography, Chip, Avatar } from '@mui/material';
import { alpha, Stack, Box } from '@mui/material';

import NetworkTransactionLink from '../../atoms/network-transaction-link';
import { CategoriesList } from '../../molecules/categories-list';

export interface IColumnGrid {
  header_name: string;
  column_name: ColumnType;
  field?: string;
  cell?: (params: any) => ReactNode;
  valueGetter?: (params: any) => any;
}

type Props = {
  columns: IColumnGrid[];
  data: {
    pages: any[];
  };
};

type ColumnType =
  | 'credential_id'
  | 'category'
  | 'issuer_id'
  | 'issuer_id_issuers'
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
      column_name: 'issuer_id_issuers',
      cell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar
            alt="Name"
            src="/images/avatar-default.png"
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
              {params?.issuedCredentials[0].issuerUser.id}
              {/* [x] Remove mock */}
            </Typography>
            {/* <Tooltip title="Tooltip message">
              <VerifiedIcon sx={{ color: brandColors.purple.main }} />
            </Tooltip> */}
          </Box>
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
            src="/images/avatar-default.png"
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
              {params?.issuerUser?.id}
              {/* [x] Remove mock */}
            </Typography>
            {/* <Tooltip title="Tooltip message">
              <VerifiedIcon sx={{ color: brandColors.purple.main }} />
            </Tooltip> */}
          </Box>
        </Box>
      ),
    },
    {
      field: 'recipient_id',
      column_name: 'recipient_id',
      cell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar
            alt="Name"
            src="/images/avatar-default.png"
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
              {params.recipientUser.id}
              {/* [x] Remove mock */}
            </Typography>
            {/* <Tooltip title="Tooltip message">
              <VerifiedIcon sx={{ color: brandColors.purple.main }} />
            </Tooltip> */}
          </Box>
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
      {data &&
      data.pages &&
      data.pages.length > 0 &&
      data.pages[0].length > 0 ? (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
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
                          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
                        }}
                      >
                        {gridColumns.map((column) => (
                          <>
                            {column.cell ? (
                              <>{column.cell(row)}</>
                            ) : (
                              <Box
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
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
      ) : (
        <Box sx={{ px: { xs: 0, md: 4, lg: 6 } }}>
          <Typography>No data to display</Typography>
        </Box>
      )}
    </>
  );
}
