import { useAuth } from '@/providers/auth';
import { useQuery } from '@tanstack/react-query';

type Props = {
  gateId: number;
};

export function useCredentialByGateId({ gateId }: Props) {
  const { me, gqlAuthMethods } = useAuth();

  const credential_id = me?.credentials?.find(
    (cred) => cred?.gate_id === gateId
  )?.id;

  const { data: credential } = useQuery(
    ['credential', credential_id],
    () =>
      gqlAuthMethods.credential({
        id: credential_id,
      }),
    {
      enabled: !!credential_id,
    }
  );

  return credential;
}
