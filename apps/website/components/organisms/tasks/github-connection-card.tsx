import { Button, Stack, Typography } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useLocalStorage } from 'react-use';

export default function GithubConnectionCard() {
  const { t } = useTranslation('gate-profile');
  const router = useRouter();
  const [githubRedirectUrl, setGithubRedirectUrl, remove] = useLocalStorage(
    'github_redirect_url',
    router.asPath
  );

  const client_id =
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_DEV
      : process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_PROD;

  const connectGithub = async () =>
    router.push(
      `https://github.com/login/oauth/authorize?client_id=${client_id}`
    );

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
          {t('github.connect')}
        </Typography>
        <Typography variant="body2" sx={{ color: '#BDBEC0' }}>
          {t('github.description')}
        </Typography>
      </Stack>
      <Stack>
        <Button
          variant="contained"
          size="large"
          onClick={connectGithub}
          sx={{ margin: '15px', color: 'black', backgroundColor: '#E5E5E5' }}
        >
          {t('github.action')}
        </Button>
      </Stack>
    </Stack>
  );
}
