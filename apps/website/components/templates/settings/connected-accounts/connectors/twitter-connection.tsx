import { useMutation } from "@tanstack/react-query";
import { AccountHandlerConnection } from "../components/accounts-card";
import { useLocalStorage } from "react-use";
import { useRouter } from "next/router";

type connectTwitterProps = {
  disconnect?: boolean;
}

export function connectionHandlerTwitter(props: connectTwitterProps = { disconnect: false }): AccountHandlerConnection {
  const router = useRouter();
  const [twitterKeys, setTwitterKeys, remove] = useLocalStorage<any>('twitter');
  const [_redirectURL, setRedirectURL, removeRedirectUrl] = useLocalStorage('redirectURL', null, {
    raw: true,
  });

  const connectMutation = useMutation(['connect-twitter'], async () => {
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

  const connect = connectMutation.mutate;

  const disconnect = async () => {
    remove();
    removeRedirectUrl();
  }

  return { isConnected: !!twitterKeys, connect, disconnect, isLoading: connectMutation.isLoading };
}
