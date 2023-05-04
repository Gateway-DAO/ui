import { useRouter } from 'next/router';

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import jwt from 'jsonwebtoken';

import { Box } from '@mui/material';

import { HeadContainer } from '../../components/molecules/head-container';
import { Navbar } from '../../components/organisms/navbar';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { GateViewTemplate } from '../../components/templates/gate-view';
import { query } from '../../constants/queries';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../providers/auth';
import { gqlAnonMethods, gqlMethods } from '../../services/hasura/api';
import { getServerSession } from '../../services/next-auth';

const unaccesible = {
  redirect: {
    destination: ROUTES.EXPLORE,
    permanent: false,
  },
};

export async function getServerSideProps({ req, res, params }) {
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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function GateProfilePage() {
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
      query.protocol_credential_by_loyalty_id_by_gate_id,
      {
        user_id: me?.id,
        loyalty_id: gate?.loyalty_id,
        gate_id: gate?.id,
      },
    ],
    () =>
      gqlAuthMethods.protocol_credential_by_loyalty_id_by_gate_id({
        user_id: me?.id,
        loyalty_id: gate?.loyalty_id,
        gate_id: gate?.id,
      }),
    {
      enabled: !!me?.id,
      select: ({ loyalty_protocol_credential }) =>
        loyalty_protocol_credential.credential,
    }
  );

  return (
    <>
      <HeadContainer title={`${gate?.title} Credential`} />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: '',
            pt: 2,
            display: {
              md: 'flex',
            },
          },
          height: gate?.type === 'direct' ? '100%' : undefined,
        }}
      >
        <Box
          sx={{
            display: {
              xs: 'flex',
              md: 'none',
            },
          }}
        >
          <Navbar isInternalPage={true} />
        </Box>
        <GateViewTemplate
          gateProps={gate}
          protocolCredential={protocolCredential}
        />
      </DashboardTemplate>
    </>
  );
}
