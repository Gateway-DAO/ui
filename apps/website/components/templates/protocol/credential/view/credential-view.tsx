import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest';

import { Divider, Stack, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';

import { Credential } from '../../../../../services/gateway-protocol/types';
import ExternalLink from '../../../../atoms/external-link';
import { MintCredentialButton } from '../../../../atoms/mint-button';
import Activities from './components/activities';
import CredentialCardInfo from './components/credential-card-info';
import DataTable from './components/data-table';
import GeneralInformation from './components/general-information';

type Props = {
  credential: PartialDeep<Credential>;
};

export default function CredentialProtocolView({ credential }: Props) {
  const { t } = useTranslation('protocol');

  // MOCK
  const credMint = {
    status: 'to_mint',
    transaction_url: 'x',
  };
  // MOCK - END

  const boxStyles: SxProps<Theme> = {
    maxWidth: '564px',
    width: '100%',
    mx: 'auto',
    textAlign: 'left',
  };

  return (
    <>
      <Stack sx={boxStyles}>
        <GeneralInformation credential={credential} />
        <CredentialCardInfo credential={credential} />
        <MintCredentialButton credential={credMint} />
        {/* {credential?.activities?.length > 0 && (
          <Activities activities={credential?.activities} />
        )} */}
      </Stack>
      <Divider sx={{ mt: 3, mb: 4, marginLeft: '2px' }} />
      <Stack sx={boxStyles}>
        <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
          <ExternalLink text={t('credential.storage-id')} url="" />
        </Stack>
        {/* <DataTable title={t('credential.claim')} data={credential?.claim} /> */}
        <DataTable
          title={t('credential.evidence')}
          data={credential?.evidences}
        />
      </Stack>
    </>
  );
}
