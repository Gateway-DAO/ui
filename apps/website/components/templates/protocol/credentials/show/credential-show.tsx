import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';

import { PartialDeep } from 'type-fest';

import {
  Alert,
  AlertTitle,
  Divider,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';

import { Credential, CredentialStatus } from '../../../../../services/gateway-protocol/types';
import ExternalLink from '../../../../atoms/external-link';
import { MintCredentialButton } from '../../../../atoms/mint-button';
import Tags from '../../components/tags';
import Activities from './components/activities';
import CredentialTitleAndImage from './components/credential-title-and-image';
import DataTable from './components/data-table';
import { brandColors } from '../../../../../../../libs/theme/src';
import { ROUTES } from 'apps/website/constants/routes';
import { useRouter } from 'next/router';

const CredentialCardInfo = dynamic(
  () => {
    return import('../../components/credential-card-info');
  },
  { ssr: false }
);

type Props = {
  credential: PartialDeep<Credential>;
};

export default function CredentialProtocolShow({ credential }: Props) {
  const { t } = useTranslation('protocol');
  const router = useRouter();

  // MOCK
  const credMint = {
    status: 'to_mint',
    transaction_url: 'x',
  };

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
        <MintCredentialButton sx={{ height: '48px' }} credential={credMint} disabled={true} />

        {credential.status === CredentialStatus.Invalid && (
          <Alert
            variant="outlined"
            severity="error"
            sx={{
              borderRadius: 2,
              borderColor: '#FF002E',
              '.MuiAlert-icon': {
                alignItems: 'center',
              },
            }}
          >
            <AlertTitle
              sx={{
                fontWeight: 600,
                color: brandColors.red.main,
              }}
            >
              {t('credential.alert-title')}
            </AlertTitle>
            {t('credential.alert-description')}
          </Alert>
        )}

        <ExternalLink
          text={t('credential.data-model-id')}
          sxProps={{ alignSelf: 'flex-end' }}
          handleClick={() => {
            router.push({ pathname: ROUTES.PROTOCOL_DATAMODEL, query: { id: credential?.dataModel?.id } })
          }}
        />

        {credential?.activities?.length > 0 && <Activities activities={credential?.activities} />}
      </Stack>
      <Divider sx={{ mt: 3, mb: 4, marginLeft: '2px' }} />
      <Stack sx={boxStyles}>
        <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
          <ExternalLink
            text={t('credential.storage-id')}
            handleClick={(e) => {
              e.preventDefault();
              if (credential?.arweaveInfo?.url)
                window.open(credential?.arweaveInfo?.url)
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
