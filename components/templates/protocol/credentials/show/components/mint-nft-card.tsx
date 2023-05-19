import useTranslation from 'next-translate/useTranslation';

import { brandColors } from '@/theme';
import { limitCharsCentered } from '@/utils/string';

import {
  alpha,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { Chain } from '../../../../../../services/gateway-protocol/types';
import { getExplorer, getSolanaExplorer } from '../../../../../../utils/web3';
import {
  PolygonIcon,
  EthereumIcon,
  SolanaIcon,
} from '../../../../../atoms/icons';

type Chains = 'Solana' | 'Ethereum' | 'Polygon'; // TODO: Remove

type ComingSoonType = {
  adText?: string;
  chains: Chains[];
};

export type MintedChain = {
  chain: Chain;
  transaction: string;
};

type Props = {
  title?: string;
  publicView?: boolean;
  comingSoon?: ComingSoonType;
  mintedData?: MintedChain[] | null;
  mintAction?: () => void;
  chain?: Chain;
};

const mintNetworks = {
  SOL: {
    icon: <SolanaIcon />,
    name: 'Solana',
  },
  Ethereum: {
    icon: <EthereumIcon />,
    name: 'Ethereum',
    id: 1,
  },
  EVM: {
    icon: <PolygonIcon />,
    name: 'Polygon',
    id: process.env.NEXT_PUBLIC_PROTOCOL_ENV === 'production' ? 137 : 80001, // TODO: Update this validation
  },
};

const chains = {
  [Chain.Sol]: {
    mintNetworks: [mintNetworks.SOL],
  },
  [Chain.Evm]: {
    mintNetworks: [mintNetworks.EVM], // TODO: add mintNetworks.etherium
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
        <Typography variant="body2">{chain}</Typography>
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
  chain: Chain;
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
          {mintNetworks[chain].icon}
        </span>
        <Typography variant="body2">{mintNetworks[chain].name}</Typography>
      </Box>
      <Stack justifyContent="space-between" direction="row" gap="30px">
        <Typography
          color={brandColors.purple.main}
          fontSize="14px"
          letterSpacing="0.17px"
          fontWeight="400"
          component="a"
          href={`${
            chain === Chain.Evm
              ? getExplorer(mintNetworks[chain].id) + '/tx/' + transaction
              : getSolanaExplorer(
                  process.env.NEXT_PUBLIC_SOLANA_CLUSTER,
                  `/tx/${transaction}`
                )
          }`}
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
  chain,
}: Props): JSX.Element {
  const { t } = useTranslation('protocol');

  return (
    <Paper
      elevation={2}
      component={Stack}
      sx={{
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
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
        {chain && (
          <>
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
              <>
                {chains[chain].mintNetworks.map((network) => (
                  <ChainRow
                    key={network.name}
                    icon={network.icon}
                    chain={network.name}
                    mintAction={mintAction}
                  />
                ))}
              </>
            )}
          </>
        )}

        {comingSoon &&
          chain &&
          comingSoon.chains.map((chain) => (
            <ChainRow
              key={mintNetworks[chain].name}
              icon={mintNetworks[chain].icon}
              chain={mintNetworks[chain].name}
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
