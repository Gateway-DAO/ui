import useTranslation from 'next-translate/useTranslation';

import { Button } from '@mui/material';

import { TokenFilled } from './mint-card/assets/token-filled';

type Props = {
  setMintModal: (value: boolean) => void;
  showButton: boolean;
};

export default function GateMintButton({ setMintModal, showButton }: Props) {
  const { t } = useTranslation('credential');

  return (
    <>
      {showButton && (
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
