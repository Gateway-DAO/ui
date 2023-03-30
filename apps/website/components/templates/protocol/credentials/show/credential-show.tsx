import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { Divider, Stack, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';

import { query } from '../../../../../constants/queries';
import { ROUTES } from '../../../../../constants/routes';
import { useAuth } from '../../../../../providers/auth';
import { gatewayProtocolAuthSDK } from '../../../../../services/gateway-protocol/api';
import {
  Chain,
  Credential,
  MintCredentialMutationVariables,
} from '../../../../../services/gateway-protocol/types';
import ExternalLink from '../../../../atoms/external-link';
import ShareOn from '../../../../atoms/share-on';
import ModalContent from '../../../../molecules/modal/modal-basic';
import CredentialCardInfo from '../../components/credential-card-info';
import Tags from '../../components/tags';
import Activities from './components/activities';
import CredentialTitleAndImage from './components/credential-title-and-image';
import DataTable from './components/data-table';
import { InvalidStatusBox } from './components/invalid-status-box';
import { MintDialog } from './components/mint-dialog';
import MintNFTCard, { MintedChain } from './components/mint-nft-card';
import { RevokeCredential } from './components/revoke-credential';

type Props = {
  credential: PartialDeep<Credential>;
};

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  credential: PartialDeep<Credential>;
  title: string;
};

const ModalShareCredential = ({
  open,
  handleClose,
  handleOpen,
  credential,
  title,
}: ModalProps): JSX.Element => {
  return (
    <ModalContent
      open={open}
      title={title}
      handleClose={handleClose}
      handleOpen={handleOpen}
      swipeableDrawer={true}
      fullWidth
    >
      <ShareOn isCredential credential={credential} />
    </ModalContent>
  );
};

export default function CredentialProtocolShow({ credential }: Props) {
  const { t } = useTranslation('protocol');
  const { me } = useAuth();
  const { token } = useAuth();
  const [shareIsOpen, setShareIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const isReceivedCredential =
    me && me?.wallet === credential?.recipientUser?.primaryWallet?.address;

  const isAllowedToMint = credential.nft !== null;

  // TODO: Remove this method
  const changeChainName = (chain): Chain => {
    if (chain === 'ethereum') return Chain.Evm;
    return chain;
  };

  const initialMintData: MintedChain[] | null =
    credential.nft && credential.nft.minted
      ? [
          {
            chain: changeChainName(credential.nft.chain) as Chain,
            transaction: credential.nft.txHash,
          },
        ]
      : null;

  const [mintData, setMintData] = useState(initialMintData);
  const [isOpen, setIsOpen] = useState(false);

  const mintCredential = useMutation(
    [query.mintCredential],
    ({ credentialId }: MintCredentialMutationVariables) => {
      return gatewayProtocolAuthSDK(token).mintCredential({
        credentialId: credentialId,
      });
    },
    {
      onSuccess: (data) => {
        setIsOpen(true);
        setTimeout(() => {
          setIsOpen(false);
          setShareIsOpen(true);
        }, 2500);
        setMintData([
          {
            chain: credential?.recipientUser?.primaryWallet?.chain,
            transaction: data.mintCredential.txHash,
          },
        ]);
      },
    }
  );

  const boxStyles: SxProps<Theme> = {
    maxWidth: '564px',
    width: '100%',
    mx: 'auto',
    textAlign: 'left',
  };

  return (
    <>
      <Stack sx={boxStyles}>
        <CredentialTitleAndImage credential={credential} />
        <Tags tags={credential?.dataModel?.tags} />
        <Typography sx={{ mb: 3 }}>{credential?.description}</Typography>
        <CredentialCardInfo credential={credential} />

        {isReceivedCredential && isAllowedToMint && (
          <MintNFTCard
            title={t('credential.mint-card.title')}
            mintedData={mintData ? mintData : null}
            comingSoon={{
              adText: `${t('credential.mint-card.chain-coming-message')}`,
              chains: ['Ethereum'],
            }}
            mintAction={() =>
              mintCredential.mutate({ credentialId: credential.id })
            }
            chain={credential?.recipientUser?.primaryWallet?.chain}
          />
        )}

        {!isReceivedCredential && mintData && (
          <MintNFTCard
            title={t('credential.mint-card.title')}
            mintedData={mintData}
            chain={credential?.recipientUser?.primaryWallet?.chain}
          />
        )}

        <MintDialog
          isOpen={mintCredential.isLoading || isOpen}
          status={mintCredential.status}
          onClose={() => setIsOpen(false)}
        />

        <ModalShareCredential
          credential={credential}
          handleClose={() => setShareIsOpen(false)}
          handleOpen={() => setShareIsOpen(true)}
          open={shareIsOpen}
          title={t('credential.share-dialog-title')}
        />

        <RevokeCredential credential={credential} />
        <InvalidStatusBox credential={credential} />
        <ExternalLink
          text={t('credential.data-model-id')}
          sxProps={{ alignSelf: 'flex-end' }}
          handleClick={() => {
            router.push({
              pathname: ROUTES.PROTOCOL_DATAMODEL,
              query: { id: credential?.dataModel?.id },
            });
          }}
        />
        <Activities activities={credential?.activities} />
      </Stack>
      <Divider sx={{ mt: 3, mb: 4, marginLeft: '2px' }} />
      <Stack sx={boxStyles}>
        <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
          <ExternalLink
            text={t('credential.storage-id')}
            handleClick={(e) => {
              e.preventDefault();
              if (credential?.arweaveInfo?.url)
                window.open(credential?.arweaveInfo?.url);
            }}
          />
        </Stack>
        <DataTable
          title={t('credential.claim')}
          data={credential?.claimArray}
        />
      </Stack>
    </>
  );
}
