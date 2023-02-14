import useTranslation from 'next-translate/useTranslation';
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

import {
  PolygonIcon,
  EthereumIcon,
  SolanaIcon,
} from '../../../../../atoms/icons';

type Props = { title?: string; publicView?: boolean; adText?: string };

function ChainRow({
  chain,
  disabled,
  icon,
}: {
  chain: string;
  disabled?: boolean;
  icon: React.ReactNode;
}): JSX.Element {
  const { t } = useTranslation('protocol');

  return (
    <Stack
      sx={{
        py: { xs: 2, md: 2 },
        px: { xs: 3, md: 2 },
        color: disabled
          ? alpha(brandColors.white.main, 0.5)
          : brandColors.white.main,
      }}
      direction="row"
      justifyContent="space-between"
    >
      <Box
        sx={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            color: 'inherit',
            display: 'flex',
          }}
        >
          {icon}
        </span>
        <Typography>{chain}</Typography>
      </Box>
      <Button variant="outlined" disabled={disabled}>
        {disabled
          ? `${t('credential.mint-card.chain-action-coming')}`
          : `${t('credential.mint-card.chain-action')}`}
      </Button>
    </Stack>
  );
}

export default function MintNFTCard({
  title,
  publicView,
  adText,
}: Props): JSX.Element {
  const { t } = useTranslation('protocol');

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
            py: { xs: 2, md: 2 },
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
            {t('credential.mint-card.chain-column')}
          </Typography>
        </Box>
      </Stack>
      <Stack divider={<Divider sx={{ width: '100%' }} />}>
        <ChainRow
          icon={<SolanaIcon sx={{ width: 16, height: 13 }} />}
          chain="Solana"
        />
        <ChainRow
          icon={<EthereumIcon sx={{ width: 10, height: 17 }} />}
          chain="Ethereum"
          disabled
        />
        <ChainRow
          icon={<PolygonIcon sx={{ width: 17, height: 15 }} />}
          chain="Polygon"
          disabled
        />
      </Stack>
      <Box
        sx={{
          backgroundColor: brandColors.purple.main,
          py: { xs: 0, md: 1.5 },
          px: { xs: 3, md: 2 },
          display: publicView ? 'none' : 'default',
        }}
      >
        <Typography fontSize={12}>{adText}</Typography>
      </Box>
    </Paper>
  );
}
