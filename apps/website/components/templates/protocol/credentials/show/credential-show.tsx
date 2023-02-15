import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { PartialDeep } from 'type-fest';

import { Divider, Stack, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';

import { ROUTES } from '../../../../../constants/routes';
import { Credential } from '../../../../../services/gateway-protocol/types';
import ExternalLink from '../../../../atoms/external-link';
import CredentialCardInfo from '../../components/credential-card-info';
import Tags from '../../components/tags';
import Activities from './components/activities';
import CredentialTitleAndImage from './components/credential-title-and-image';
import DataTable from './components/data-table';
import { InvalidStatusBox } from './components/invalid-status-box';
import MintNFTCard from './components/mint-nft-card';
import { RevokeCredential } from './components/revoke-credential';

type Props = {
  credential: PartialDeep<Credential>;
};

export default function CredentialProtocolShow({ credential }: Props) {
  const { t } = useTranslation('protocol');
  const router = useRouter();

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

        <MintNFTCard
          title={t('credential.mint-card.title')}
          comingSoon={{
            adText: `${t('credential.mint-card.chain-coming-message')}`,
            chains: ['ethereum', 'polygon'],
          }}
        />
        <MintNFTCard
          title={t('credential.mint-card.title')}
          mintedData={[
            {
              chain: 'solana',
              transaction: '0x5465sa645af875440',
              token: '3185',
            },
          ]}
          comingSoon={{
            adText: `${t('credential.mint-card.chain-coming-message')}`,
            chains: ['ethereum', 'polygon'],
          }}
        />
        <MintNFTCard
          title={t('credential.mint-card.title')}
          mintedData={[
            {
              chain: 'solana',
              transaction: '0x5465sa645af875440',
              token: '3185',
            },
          ]}
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
