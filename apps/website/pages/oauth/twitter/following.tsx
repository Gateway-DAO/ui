import { useQuery } from '@tanstack/react-query';
import { useLocalStorage, useLocation } from 'react-use';

export default function RedirectPage() {
  const search = useLocation().search;
  const oauthToken = new URLSearchParams(search).get('oauth_token');
  const oauthVerifier = new URLSearchParams(search).get('oauth_verifier');
  const [_twitter, setTwitter] = useLocalStorage('twitter');
  const [redirectURL] = useLocalStorage('redirectURL', null, {
    raw: true,
  });

  useQuery(['callback-twitter'], async () => {
    const response: any = await fetch(
      `/api/oauth/twitter/callback?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`
    );
    const data = await response.json();

    setTwitter(data);

    if (redirectURL) {
      window.location.replace(redirectURL);
    }
  });

  return (
    <>
      <span />
    </>
  );
}
