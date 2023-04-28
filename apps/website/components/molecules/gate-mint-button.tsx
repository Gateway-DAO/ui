import useTranslation from 'next-translate/useTranslation';

import { Button } from '@mui/material';

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
      {showButton && !mintData && (
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
      )}
    </>
  );
}
