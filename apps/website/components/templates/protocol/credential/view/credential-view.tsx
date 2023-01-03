import { Stack } from '@mui/material';

import Card from './components/card';
import GeneralInformation from './components/general-information';

// MOCK
export type MockCredential = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  issuanceDate: string;
  expirationDate: string;
  status: number;
};

export type MockEntity = {
  avatar: any;
  username: string;
  wallet: string;
  id: string;
};
// MOCK - END

export default function CredentialProtocolView() {
  // MOCK
  const mockCredential: MockCredential = {
    id: 'fbabef4b-809f-4a55-af71-32e00b6e6828',
    title: 'Certification of Degree',
    description:
      'This credential certifies that the student has completed the undergraduate degree program at Harvard University.',
    tags: ['Education', 'Undergraduate', 'Development'],
    issuanceDate: 'Aug 5th, 2022',
    expirationDate: 'Indeterminate',
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
    </Stack>
  );
}
