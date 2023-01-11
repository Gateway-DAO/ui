import useTranslation from 'next-translate/useTranslation';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { CircularProgress, Divider, Stack } from '@mui/material';

import { useAuth } from '../../../../../providers/auth';
import { Credential } from '../../../../../services/gateway-protocol/types';
import ExternalLink from '../../../../atoms/external-link';
import { MintCredentialButton } from '../../../../atoms/mint-button';
import Activities from './components/activities';
import Card from './components/card';
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

  return (
    <>
      <Stack
        sx={{
          maxWidth: '564px',
          width: '100%',
          mx: 'auto',
          textAlign: 'left',
        }}
      >
        <GeneralInformation credential={credential} />
        <Card credential={credential} />
        <MintCredentialButton credential={credMint} />
        {/* {credential?.activities?.length > 0 && (
          <Activities activities={credential?.activities} />
        )} */}
      </Stack>
      <Divider sx={{ mt: 3, mb: 4, marginLeft: '2px' }} />
      <Stack
        sx={{
          maxWidth: '564px',
          width: '100%',
          mx: 'auto',
          textAlign: 'left',
        }}
      >
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
