import Head from 'next/head';
import { useRouter } from 'next/router';

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import jwt from 'jsonwebtoken';

import { Box } from '@mui/material';

import { Navbar } from '../../components/organisms/navbar';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { GateViewTemplate } from '../../components/templates/gate-view';
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

  await queryClient.prefetchQuery(['gate', id], () => gate);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function GateProfilePage() {
  const router = useRouter();

  const id = router.query.id as string;

  const { gqlAuthMethods, authenticated } = useAuth();

  const { data: gatesData } = useQuery(
    ['gate', id],
    () =>
      gqlAuthMethods.gate({
        id,
      }),
    { enabled: authenticated }
  );
  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          overflow: '',
          pt: 2,
          display: {
            md: 'flex',
          },
        },
        height: gatesData.gates_by_pk?.type === 'direct' ? '100%' : undefined,
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
      <Head>
        <meta
          property="og:url"
          content={`https://v2.mygateway.xyz/credential/${gatesData.gates_by_pk.id}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={gatesData.gates_by_pk.title} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@Gateway_xyz" />
        <meta name="twitter:title" content={gatesData.gates_by_pk.title} />
        <meta
          name="twitter:description"
          content={`🎉 Just got my hands on the ${gatesData.gates_by_pk.title} issued from ${gatesData.gates_by_pk.creator?.name} via @Gateway_xyz`}
        />
        <meta name="twitter:image" content={gatesData.gates_by_pk.image} />
        <meta
          property="og:description"
          content={`🎉 Just got my hands on the ${gatesData.gates_by_pk.title} issued from ${gatesData.gates_by_pk.creator?.name} via @Gateway_xyz`}
        />
        <meta property="og:image" content={gatesData.gates_by_pk.image} />
      </Head>
      <GateViewTemplate gateProps={gatesData.gates_by_pk} />
    </DashboardTemplate>
  );
}
