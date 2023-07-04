import { Chip, Paper, Stack, Typography } from '@mui/material';

type Props = {
  username: string;
  status: 'valid' | 'invalid';
  credentialId: string;
  qrCode: string;
};

export function CredentialIdentityCard() {
  return (
    <Stack
      component={Paper}
      direction={'row'}
      padding={2}
      sx={{
        bgcolor: 'background.light',
        border: 1,
        borderColor: '#E5E5E51F',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Typography variant="body2">ID 63a...0b5</Typography>
        <Typography variant="h6">@harisson</Typography>
      </div>
      <Chip
        label="valid"
        size="small"
        color="success"
        variant="outlined"
        sx={{
          alignSelf: 'center',
        }}
      />
    </Stack>
  );
}
