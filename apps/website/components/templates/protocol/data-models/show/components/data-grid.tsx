import Image from 'next/image';

import NetworkTransactionLink from 'apps/website/components/atoms/network-transaction-link';
import { CategoriesList } from 'apps/website/components/molecules/categories-list';
import { DateTime } from 'luxon';

import { brandColors } from '@gateway/theme';

import VerifiedIcon from '@mui/icons-material/Verified';
import { Typography, Avatar, Tooltip, Chip } from '@mui/material';
import { alpha, Stack, Box } from '@mui/material';

type Props = {
  columns: string[];
};

export default function DataGrid({ columns }: Props): JSX.Element {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr',
          px: { xs: 0, md: 4, lg: 6 },
        }}
      >
        {columns.map((column) => (
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.17px',
              color: alpha(brandColors.white.main, 0.7),
              textTransform: 'uppercase',
            }}
            key={column}
          >
            {column}
          </Typography>
        ))}
      </Box>
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: alpha(brandColors.grays.main, 0.12),
          py: 3,
        }}
      >
        <Box
          sx={{
            px: { xs: 0, md: 4, lg: 6 },
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr',
            alignItems: 'center',
          }}
        >
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
                ID 63...a0b5
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: '16px',
                  letterSpacing: '0.15px',
                  color: brandColors.white.main,
                }}
              >
                Certification of Degree
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <Stack>
              <CategoriesList
                published="bora"
                categories={['Education', 'NFT', 'Brabeza']}
              />
            </Stack>
          </Box>
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
                harvarduniversity
              </Typography>
              <Tooltip title="Tooltip message">
                <VerifiedIcon sx={{ color: brandColors.purple.main }} />
              </Tooltip>
            </Box>
          </Box>
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
          <Box>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '400',
                letterSpacing: '0.17px',
              }}
            >
              {DateTime.now().toFormat('MM/dd/yy, HH:mm a')}
            </Typography>
          </Box>
          <Box>
            <Chip
              variant="outlined"
              label="Valid"
              sx={{
                color: brandColors.green.main,
                borderColor: brandColors.green.main,
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: '5px' }}>
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
        </Box>
      </Box>
    </>
  );
}
