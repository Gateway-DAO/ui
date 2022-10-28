import { AccountHandlerConnection } from "../components/accounts-card";
import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";
import { useMutation } from "@tanstack/react-query";

type connectGithubProps = {
  disconnect?: boolean;
}

export function connectionHandlerGithub(props: connectGithubProps = { disconnect: false }): AccountHandlerConnection {
  const router = useRouter();
  const [githubAccessToken, setGithubAccessToken, remove] = useLocalStorage('github_access_token');
  const [githubRedirectUrl, setGithubRedirectUrl, removeGithubRedirectUrl] = useLocalStorage(
    'github_redirect_url',
    router.asPath
  );

  const client_id =
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_DEV
      : process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID_PROD;

  const connect = async () => {
    router.push(
      `https://github.com/login/oauth/authorize?client_id=${client_id}`
    );
  }

  const disconnect = async () => {
    remove();
    removeGithubRedirectUrl();
  }

  return { isConnected: !!githubAccessToken, connect, disconnect, isLoading: false };
}
