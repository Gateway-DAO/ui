import { useRouter } from 'next/router';

import { AccountHandlerConnection } from '@/components/atoms/social-auth-card';
import { useLocalStorage } from 'react-use';

type connectGithubProps = {
  disconnect?: boolean;
};

export function useConnectionHandlerGithub(
  props: connectGithubProps = { disconnect: false }
): AccountHandlerConnection {
  const router = useRouter();
  const [githubAccessToken, setGithubAccessToken, remove] = useLocalStorage(
    'github_access_token',
    ''
  );
  const [githubRedirectUrl, setGithubRedirectUrl, removeGithubRedirectUrl] =
    useLocalStorage('github_redirect_url');

  const client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

  const connect = async () => {
    setGithubAccessToken('');
    setGithubRedirectUrl(window?.location?.href);
    router.push(
      `https://github.com/login/oauth/authorize?client_id=${client_id}`
    );
  };

  const disconnect = async () => {
    remove();
    removeGithubRedirectUrl();
  };

  return {
    isConnected: !!githubAccessToken,
    connect,
    disconnect,
    isLoading: false,
  };
}
