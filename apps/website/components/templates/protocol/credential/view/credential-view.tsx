import useTranslation from 'next-translate/useTranslation';

import { Divider, Stack } from '@mui/material';

import ExternalLink from './../../../../../components/atoms/external-link';
import { MintCredentialButton } from './../../../../../components/atoms/mint-button';
import Activities from './components/activities';
import Card from './components/card';
import DataTable from './components/data-table';
import GeneralInformation from './components/general-information';

// MOCK
export type MockCredential = {
  id: string;
  title: string;
  qrCode: string;
  description: string;
  tags: string[];
  issuanceDate: string;
  expirationDate: string;
  status: number;
  claim: MockDataItem[];
  evidences: MockDataItem[];
  activities: MockActivity[];
};

export type MockDataItem = {
  name: string;
  value: any;
};

export type MockActivity = {
  name: string;
  description: string;
};

export type MockEntity = {
  avatar: any;
  username: string;
  wallet: string;
  id: string;
};
// MOCK - END

export default function CredentialProtocolView() {
  const { t } = useTranslation('protocol');

  // MOCK
  const mockCredential: MockCredential = {
    id: 'fbabef4b-809f-4a55-af71-32e00b6e6828',
    title: 'Certification of Degree',
    qrCode:
      'https://www.canalautismo.com.br/wp-content/uploads/2018/05/qrcode-RevistaAutismo.png',
    description:
      'This credential certifies that the student has completed the undergraduate degree program at Harvard University.',
    tags: ['Education', 'Undergraduate', 'Development'],
    issuanceDate: 'Aug 5th, 2022',
    expirationDate: 'Indeterminate',
    activities: [
      {
        name: 'Credential expired',
        description: 'Oct/05/2022, 4:20 pm',
      },
      {
        name: 'Credential issued',
        description: 'Oct/05/2022, 4:20 pm',
      },
      {
        name: 'Credential issued',
        description: 'Oct/05/2022, 4:20 pm',
      },
    ],
    claim: [
      {
        name: 'Institution',
        value: 'Harvard College',
      },
      {
        name: 'Degree Program',
        value: 'Computer Science',
      },
      {
        name: 'Category of Degree',
        value: 'Bachelor of Arts (A.B.)',
      },
    ],
    evidences: [
      {
        name: 'Undergraduate Thesis',
        value: 'http://id.lib.harvard.edu/alma/990040031760203941/catalog',
      },
    ],
    status: 0,
  };

  const mockEntity1: MockEntity = {
    username: 'havard',
    avatar: undefined,
    wallet: 'havarduniversity.ens',
    id: '1234',
  };

  const mockEntity2: MockEntity = {
    username: 'nuno21',
    avatar: undefined,
    wallet: 'nunocarvalho.ens',
    id: '1234',
  };

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
        <GeneralInformation credential={mockCredential} />
        <Card
          issuer={mockEntity1}
          recipient={mockEntity2}
          credential={mockCredential}
        />
        <MintCredentialButton credential={credMint} />
        {mockCredential?.activities?.length > 0 && (
          <Activities activities={mockCredential?.activities} />
        )}
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
        <DataTable title={t('credential.claim')} data={mockCredential?.claim} />
        <DataTable
          title={t('credential.evidence')}
          data={mockCredential?.evidences}
        />
      </Stack>
    </>
  );
}
