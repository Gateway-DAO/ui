import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import ExternalLink from '@/components/atoms/external-link';
import ModalShareCredential from '@/components/molecules/modal/modal-share-credential';
import { MintDialogProtocol } from '@/components/organisms/mint/mint-modal/mint-dialog-protocol';
import { ROUTES } from '@/constants/routes';
import { useMintData } from '@/hooks/use-mint-data';
import {
  Protocol_Api_Chain,
  Loyalty_Program,
  Protocol_Api_Credential,
} from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

import { Divider, Stack, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';

import CredentialCardInfo from '../../components/credential-card-info';
import Tags from '../../components/tags';
import Activities from './components/activities';
import CredentialTitleAndImage from './components/credential-title-and-image';
import DataTable from './components/data-table';
import { InvalidStatusBox } from './components/invalid-status-box';
import MintNFTCard from './components/mint-nft-card';
import { RevokeCredential } from './components/revoke-credential';
import TriggersCard from './components/triggers-card';

type Props = {
  credential: PartialDeep<Protocol_Api_Credential>;
  loyalty?: PartialDeep<Loyalty_Program>;
};

export default function CredentialProtocolView({ credential, loyalty }: Props) {
  const { t } = useTranslation('protocol');
  const router = useRouter();
  const {
    isOpen,
    setIsOpen,
    shareIsOpen,
    setShareIsOpen,
    shareStatus,
    mintCredential,
    mintData,
    isReceivedCredential,
    isAllowedToMint,
    changeChainName,
  } = useMintData({
    protocolCredentialId: credential?.id,
    protocolCredential: credential,
  });

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

        {(credential.revocationConditions ||
          credential.suspensionConditions ||
          credential.updateConditions) && (
          <TriggersCard credential={credential} />
        )}

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
            chain={
              changeChainName(credential?.nft?.chain) as Protocol_Api_Chain
            }
          />
        )}

        {!isReceivedCredential && mintData && (
          <MintNFTCard
            title={t('credential.mint-card.title')}
            mintedData={mintData}
            chain={
              changeChainName(credential?.nft?.chain) as Protocol_Api_Chain
            }
          />
        )}

        <MintDialogProtocol
          isOpen={mintCredential.isLoading || isOpen}
          status={shareStatus || mintCredential.status}
          onClose={() => setIsOpen(false)}
        />

        <ModalShareCredential
          credential={credential}
          handleClose={() => setShareIsOpen(false)}
          handleOpen={() => setShareIsOpen(true)}
          open={shareIsOpen}
          isLoyalty={!!loyalty}
          title={t('credential.share-dialog-title')}
          loyaltyPass={loyalty}
          actualTier={credential?.claim?.tier ?? null}
          loyaltyCredentialId={credential?.id}
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
