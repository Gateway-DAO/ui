import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest';

import { Divider, Stack, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';

import { Credential } from '../../../../../services/gateway-protocol/types';
import ExternalLink from '../../../../atoms/external-link';
import { MintCredentialButton } from '../../../../atoms/mint-button';
import DataTable from '../../components/data-table';
import Tags from '../../components/tags';
import Activities from './components/activities';
import CredentialCardInfo from './components/credential-card-info';
import CredentialTitleAndImage from './components/credential-title-and-image';
import DataTableClaim from './components/data-table-claim';

type Props = {
  credential: PartialDeep<Credential>;
};

export default function CredentialProtocolShow({ credential }: Props) {
  const { t } = useTranslation('protocol');

  // MOCK
  const credMint = {
    status: 'to_mint',
    transaction_url: 'x',
  };
  const activities = [
    {
      name: 'Credential expired',
      date: '2023-01-09T21:03:11.566Z',
    },
    {
      name: 'Credential issued',
      date: '2023-01-09T21:03:11.566Z',
    },
    {
      name: 'Credential issued',
      date: '2023-01-09T21:03:11.566Z',
    },
  ];
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
        <CredentialTitleAndImage credential={credential} />
        <Tags tags={credential?.dataModel?.tags} />
        <Typography sx={{ mb: 3 }}>{credential?.description}</Typography>
        <CredentialCardInfo credential={credential} />
        <MintCredentialButton credential={credMint} />
        {activities?.length > 0 && <Activities activities={activities} />}
      </Stack>
      <Divider sx={{ mt: 3, mb: 4, marginLeft: '2px' }} />
      <Stack sx={boxStyles}>
        <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
          <ExternalLink text={t('credential.storage-id')} url="" />
        </Stack>
        <DataTableClaim
          title={t('credential.claim')}
          data={credential?.claim}
          dataModel={credential?.dataModel}
        />
        {credential.evidences && credential.evidences.length > 0 && (
          <DataTable
            title={t('credential.evidence')}
            data={credential?.evidences}
          />
        )}
      </Stack>
    </>
  );
}
