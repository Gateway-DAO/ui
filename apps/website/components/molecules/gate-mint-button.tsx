import useTranslation from 'next-translate/useTranslation';

import { Button } from '@mui/material';

import { getExplorer } from '../../utils/web3';
import { MintedChain } from '../templates/protocol/credentials/show/components/mint-nft-card';
import { TokenFilled } from './mint-card/assets/token-filled';

type Props = {
  setMintModal: (value: boolean) => void;
  showButton: boolean;
  mintData: MintedChain[];
};

export default function GateMintButton({
  setMintModal,
  showButton,
  mintData,
}: Props) {
  const { t } = useTranslation('credential');

  return (
    <>
      {showButton &&
        (mintData ? (
          <Button
            component="a"
            variant="outlined"
            size="large"
            href={`${
              getExplorer(
                process.env.NEXT_PUBLIC_PROTOCOL_ENV === 'production' // TODO: Update this validation
                  ? 137
                  : 80001
              ) +
              '/tx/' +
              mintData
                .filter((data) => data.chain === 'EVM')
                .map((data) => data.transaction)
            }`}
            target="_blank"
            startIcon={<TokenFilled height={20} width={20} color="action" />}
            fullWidth
            sx={{
              borderColor: '#E5E5E580',
              color: 'white',
              mb: 2,
            }}
          >
            {t('mint.verify_mint_transaction')}
          </Button>
        ) : (
          <Button
            variant="contained"
            size="large"
            startIcon={<TokenFilled height={20} width={20} color="action" />}
            fullWidth
            onClick={() => setMintModal(true)}
            sx={{
              mb: 2,
            }}
          >
            {t('mint.mint_nft')}
          </Button>
        ))}
    </>
  );
}
