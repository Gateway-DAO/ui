import { useEffect } from 'react';

import { useLocation } from 'react-use';

export default function RedirectPage() {
  const search = useLocation().search;
  const oauthToken = new URLSearchParams(search).get('oauth_token');
  const oauthVerifier = new URLSearchParams(search).get('oauth_verifier');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saveData = async () => {
        const response: any = await fetch(
          `/api/oauth/twitter/callback?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`
        );
        const data = await response.json();
        const redirectURL = window.localStorage.getItem('redirectURL');

        window.localStorage.setItem('twitter', JSON.stringify(data));

        if (redirectURL) {
          window.location.replace(redirectURL);
        }
      };

      saveData();
    }
  }, []);

  return (
    <>
      <span />
    </>
  );
}
