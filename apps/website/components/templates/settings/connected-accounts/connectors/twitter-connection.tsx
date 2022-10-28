import { useMutation } from "@tanstack/react-query";
import { AccountHandlerConnection } from "../../../../molecules/accounts-card";
import { useLocalStorage } from "react-use";

type connectTwitterProps = {
  disconnect?: boolean;
}

export function connectionHandlerTwitter(props: connectTwitterProps = { disconnect: false }): AccountHandlerConnection {
  const [twitterKeys, setTwitterKeys, remove] = useLocalStorage<any>('twitter');
  const [_redirectURL, setRedirectURL] = useLocalStorage('redirectURL', null, {
    raw: true,
  });

  const connect = useMutation(['connect-twitter'], async () => {
    try {
      const response = await fetch('/api/oauth/twitter/login');
      const data = await response.json();
      setRedirectURL(window.location.href);
      if (data.confirmed) {
        window.location.href = data.callbackURL;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  });

  const disconnect = async () => {
    remove();
  }

  return { isConnected: !!twitterKeys, connect, disconnect, isLoading: connect.isLoading };
}
