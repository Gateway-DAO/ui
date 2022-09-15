import { Button, Stack, Typography } from '@mui/material';

const GithubConnectionCard = () => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-around"
      alignItems={{ xs: 'center', sm: 'center' }}
      padding="20px 0"
      sx={{
        width: '100%',
        color: 'white',
        backgroundColor: '#24292F',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        marginTop: '-10px',
      }}
    >
      <Stack maxWidth="400px">
        <Typography variant="h6" padding={'10px 0'}>
          Connect your account
        </Typography>
        <Typography variant="body2" sx={{ color: '#BDBEC0' }}>
          To complete this task, you need to authorize Gateway to access your
          GitHub account.
        </Typography>
      </Stack>
      <Stack>
        <Button
          variant="contained"
          size="large"
          sx={{ margin: '15px', color: 'black', backgroundColor: '#E5E5E5' }}
        >
          Connect Github
        </Button>
      </Stack>
    </Stack>
  );
};

export default GithubConnectionCard;
