import Image from 'next/image';

import { brandColors } from '@gateway/theme';

import {
  alpha,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

type Props = { title?: string };

export default function MintNFTCard({
  title = 'Minted on',
}: Props): JSX.Element {
  return (
    <Paper
      elevation={2}
      component={Stack}
      sx={{
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        mb: 3,
        overflow: 'hidden',
        boxShadow: 'none',
      }}
    >
      <Stack>
        <Box
          sx={{
            py: { xs: 0, md: 2 },
            px: { xs: 3, md: 2 },
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              color: alpha(brandColors.white.main, 0.7),
              letterSpacing: '0.1px',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '12px',
              letterSpacing: '0.4px',
              color: alpha(brandColors.white.main, 0.7),
            }}
          >
            Chain
          </Typography>
        </Box>
      </Stack>
      <Stack divider={<Divider sx={{ width: '100%' }} />}>
        <Stack
          sx={{ py: { xs: 0, md: 2 }, px: { xs: 3, md: 2 } }}
          direction="row"
          justifyContent="space-between"
        >
          <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Image
              src="/images/solana-icon.svg"
              alt="Polygon icon"
              width={16}
              height={13}
            />
            <Typography>Solana</Typography>
          </Box>
          <Button variant="outlined">Mint as NFT</Button>
        </Stack>
        <Stack
          sx={{ py: { xs: 0, md: 2 }, px: { xs: 3, md: 2 } }}
          direction="row"
          justifyContent="space-between"
        >
          <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Image
              src="/images/ethereum-icon.svg"
              alt="Polygon icon"
              width={10}
              height={16}
            />
            <Typography>Ethereum</Typography>
          </Box>
          <Button variant="outlined" disabled>
            Coming soon
          </Button>
        </Stack>
        <Stack
          sx={{ py: { xs: 0, md: 2 }, px: { xs: 3, md: 2 } }}
          direction="row"
          justifyContent="space-between"
        >
          <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Image
              src="/images/polygon-icon.svg"
              alt="Polygon icon"
              width={16}
              height={14}
            />
            <Typography>Polygon</Typography>
          </Box>
          <Button variant="outlined" disabled>
            Coming soon
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          backgroundColor: brandColors.purple.main,
          py: { xs: 0, md: 1.5 },
          px: { xs: 3, md: 2 },
        }}
      >
        <Typography fontSize={12}>
          Multi-chain wallets is coming soon
        </Typography>
      </Box>
    </Paper>
  );
}
