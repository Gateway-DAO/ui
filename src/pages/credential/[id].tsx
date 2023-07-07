import { GateView } from '@/components/features/gates/view';
import { HeadContainer } from '@/components/molecules/head-container';
import { Navbar } from '@/components/organisms/navbar';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { ROUTES } from '@/constants/routes';
import { hasuraPublicService, hasuraApi } from '@/services/hasura/api';
import { getServerSession } from '@/services/next-auth/get-server-session';
import jwt from 'jsonwebtoken';

import { Box } from '@mui/material';

const unaccesible = {
  redirect: {
    destination: ROUTES.EXPLORE,
    permanent: false,
  },
};

export default function GateProfilePage({ credential, gate }) {
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
        <GateView
          gateProps={gate}
          protocolCredential={credential?.credentials_protocol}
        />
      </DashboardTemplate>
    </>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const { id } = params;

  const session = await getServerSession(req, res);

  let expired = false;

  const parsedToken = jwt.decode(session?.token, { json: true });
  expired = !!session && parsedToken.exp < Date.now() / 1000;

  let gate;
  let credential;

  try {
    if (!!session && !expired) {
      gate = await hasuraApi(session?.token).gate({ id });

      credential = await hasuraApi(
        session?.token
      ).credential_by_user_id_by_gate_id({
        user_id: session?.hasura_id,
        gate_id: id,
      });
    }
    if (!gate) {
      gate = await hasuraPublicService.gate({ id });
    }
  } catch (e) {
    return unaccesible;
  }

  if (!gate?.gates_by_pk) {
    return unaccesible;
  }

  return {
    props: {
      gate: gate?.gates_by_pk,
      credential: credential?.credentials?.find((c) => c) ?? null,
    },
  };
}
