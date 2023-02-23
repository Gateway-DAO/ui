import useTranslation from 'next-translate/useTranslation';

import { limitCharsCentered } from '@gateway/helpers';
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

type Chains = 'solana' | 'ethereum' | 'polygon';

type ComingSoonType = {
  adText?: string;
  chains: Chains[];
};

export type MintedChain = {
  chain: Chains;
  transaction: string;
};

type Props = {
  title?: string;
  publicView?: boolean;
  comingSoon?: ComingSoonType;
  mintedData?: MintedChain[] | null;
  mintAction?: () => void;
};

const chains = {
  solana: {
    icon: <SolanaIcon sx={{ width: 16, height: 13 }} />,
    name: 'Solana',
  },
  ethereum: {
    icon: <EthereumIcon sx={{ width: 10, height: 17 }} />,
    name: 'Ethereum',
  },
  polygon: {
    icon: <PolygonIcon sx={{ width: 17, height: 15 }} />,
    name: 'Polygon',
  },
};

function ChainRow({
  chain,
  disabled,
  icon,
  mintAction,
}: {
  chain: string;
  disabled?: boolean;
  icon: React.ReactNode;
  mintAction?: () => void;
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
      <Button variant="outlined" onClick={mintAction} disabled={disabled}>
        {disabled
          ? `${t('credential.mint-card.chain-action-coming')}`
          : `${t('credential.mint-card.chain-action')}`}
      </Button>
    </Stack>
  );
}

function ChainMintedRow({
  chain,
  transaction,
}: {
  chain: Chains;
  transaction: string;
}): JSX.Element {
  return (
    <Stack
      sx={{
        py: { xs: 2, md: 2 },
        px: { xs: 3, md: 2 },
        color: brandColors.white.main,
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
          {chains[chain].icon}
        </span>
        <Typography>{chains[chain].name}</Typography>
      </Box>
      <Stack justifyContent="space-between" direction="row" gap="30px">
        <Typography
          color={brandColors.purple.main}
          fontSize="14px"
          letterSpacing="0.17px"
          fontWeight="400"
          mr={2}
          component="a"
          href={`https://mumbai.polygonscan.com/tx/${transaction}`}
          target="_blank"
          sx={{ textDecoration: 'none' }}
        >
          {limitCharsCentered(transaction, 6)}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default function MintNFTCard({
  title,
  publicView,
  comingSoon,
  mintedData,
  mintAction,
}: Props): JSX.Element {
  const { t } = useTranslation('protocol');

  return (
    <Paper
      elevation={2}
      component={Stack}
      sx={{
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        borderBottomRightRadius: comingSoon?.adText ? 30 : 20,
        borderBottomLeftRadius: comingSoon?.adText ? 30 : 20,
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
          <Stack direction="row" justifyContent="space-between">
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
            {mintedData && (
              <Stack justifyContent="space-between" direction="row" gap="25px">
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '12px',
                    letterSpacing: '0.4px',
                    color: alpha(brandColors.white.main, 0.7),
                  }}
                >
                  {t('credential.mint-card.transaction-column')}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
      <Stack divider={<Divider sx={{ width: '100%' }} />}>
        {mintedData ? (
          <>
            {mintedData.map((chain) => (
              <ChainMintedRow
                key={chain.transaction}
                chain={chain.chain}
                transaction={chain.transaction}
              />
            ))}
          </>
        ) : (
          <ChainRow
            icon={<PolygonIcon sx={{ width: 17, height: 15 }} />}
            chain="Polygon"
            mintAction={mintAction}
          />
        )}

        {comingSoon &&
          comingSoon.chains.map((chain) => (
            <ChainRow
              key={chains[chain].name}
              icon={chains[chain].icon}
              chain={chains[chain].name}
              disabled
            />
          ))}
      </Stack>
      {comingSoon && comingSoon.adText && (
        <Box
          sx={{
            backgroundColor: brandColors.purple.main,
            py: { xs: 0, md: 1.5 },
            px: { xs: 3, md: 2 },
            display: publicView ? 'none' : 'default',
          }}
        >
          <Typography fontSize={12}>{comingSoon.adText}</Typography>
        </Box>
      )}
    </Paper>
  );
}
