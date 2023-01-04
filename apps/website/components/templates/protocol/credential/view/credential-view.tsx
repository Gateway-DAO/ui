import useTranslation from 'next-translate/useTranslation';

import { Stack } from '@mui/material';

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
  claim: MockDataItems[];
  evidence: MockDataItems[];
};

export type MockDataItems = {
  title: string;
  data: any;
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
    claim: [
      {
        title: 'Institution',
        data: 'Harvard College',
      },
      {
        title: 'Degree Program',
        data: 'Computer Science',
      },
      {
        title: 'Category of Degree',
        data: 'Bachelor of Arts (A.B.)',
      },
    ],
    evidence: [
      {
        title: 'Undergraduate Thesis',
        data: 'http://id.lib.harvard.edu/alma/990040031760203941/catalog',
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
  // MOCK - END

  return (
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
      <DataTable title={t('credential.claim')} data={mockCredential?.claim} />
      <DataTable
        title={t('credential.evidence')}
        data={mockCredential?.evidence}
      />
    </Stack>
  );
}
