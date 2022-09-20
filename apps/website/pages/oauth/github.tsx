import { useRouter } from 'next/router';
import { useEffect } from 'react';

function GithubAuthPage() {
  const router = useRouter();

  const { code } = router.query;

  useEffect(() => {
    const fetchToken = async () => {
      const response = await fetch(`/api/oauth/github`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
          code,
        }),
      });

      const data = await response.json();
      const token = data?.token;
      const redirectURL = window.localStorage.getItem('github_redirect_url');

      if (token) {
        window.localStorage.setItem(
          'github_access_token',
          JSON.stringify(token)
        );
      }

      if (redirectURL) {
        window.location.replace(redirectURL);
      }
    };

    fetchToken();
  }, [code]);
  return <p>Loading</p>;
}

export default GithubAuthPage;
