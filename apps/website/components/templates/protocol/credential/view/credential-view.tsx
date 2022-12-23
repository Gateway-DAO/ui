import { Stack } from '@mui/material';

import BasicInformation from './components/basic-information';
import CardInformation from './components/card-information';

export default function CredentialProtocolView() {
  return (
    <Stack
      sx={{
        maxWidth: '564px',
        width: '100%',
        mx: 'auto',
        textAlign: 'left',
      }}
    >
      <BasicInformation />
      <CardInformation />
    </Stack>
  );
}
