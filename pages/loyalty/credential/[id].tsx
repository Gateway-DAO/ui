import { useRouter } from 'next/router';

import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import jwt from 'jsonwebtoken';

import { HeadContainer } from '../../../components/molecules/head-container';
import { DashboardTemplate } from '../../../components/templates/dashboard';
import { LoyaltyProgramCredential } from '../../../components/templates/loyalty-program/LoyaltyProgramCredential';
import { query } from '@/constants/queries';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { gqlAnonMethods, gqlMethods } from '@/services/hasura/api';
import { getServerSession } from '@/services/next-auth';

const unaccesible = {
  redirect: {
    destination: ROUTES.EXPLORE,
    permanent: false,
  },
};

export default function LoyaltyCredentialPage({ loyalty }) {
  const router = useRouter();

  const id = router.query.id as string;

  const { me, gqlAuthMethods, authenticated } = useAuth();

  const { data: gate } = useQuery(
    [query.gate, id],
    () =>
      gqlAuthMethods.gate({
        id,
      }),
    { enabled: authenticated, select: ({ gates_by_pk }) => gates_by_pk }
  );

  const { data: protocolCredential } = useQuery(
    [
      query.protocol_credential_by_gate_id,
      {
        user_id: me?.id,
        gate_id: gate?.id,
      },
    ],
    () =>
      gqlAuthMethods.get_protocol_by_gate_id({
        user_id: me?.id,
        gate_id: gate?.id,
      }),
    {
      enabled: authenticated && !!gate,
      select: ({ get_protocol_by_gate_id }) =>
        get_protocol_by_gate_id.credential,
    }
  );

  return (
    <>
      <HeadContainer
        title={`${gate?.title} Credential`}
        description={gate?.description}
      />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: 'hidden',
          },
        }}
      >
        <LoyaltyProgramCredential
          gate={gate}
          loyalty={loyalty}
          protocolCredential={protocolCredential}
        />
      </DashboardTemplate>
    </>
  );
}

export const getServerSideProps = async ({ req, res, params }) => {
  const { id } = params;
  const queryClient = new QueryClient();

  const session = await getServerSession(req, res);

  let expired = false;

  const parsedToken = jwt.decode(session?.token, { json: true });
  expired = !!session && parsedToken.exp < Date.now() / 1000;

  let gate;

  try {
    gate = await (!!session && !expired
      ? gqlMethods(session.token, session.hasura_id)
      : gqlAnonMethods
    ).gate({ id });
  } catch (e) {
    gate = await gqlAnonMethods.gate({ id });
  }

  if (!gate.gates_by_pk) {
    return unaccesible;
  }

  await queryClient.prefetchQuery([query.gate, id], () => gate);

  const { loyalty_program_by_pk } = await gqlAnonMethods.loyalty_program({
    id: gate.gates_by_pk?.loyalty_id,
  });

  return {
    props: {
      loyalty: loyalty_program_by_pk,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
