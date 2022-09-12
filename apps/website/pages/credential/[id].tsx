import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import { Box } from '@mui/material';

import { Navbar } from '../../components/organisms/navbar';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { GateViewTemplate } from '../../components/templates/gate-view';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../providers/auth';
import {
  gqlAnonMethods,
  gqlMethods,
  gqlMethodsWithRefresh,
} from '../../services/api';

export async function getServerSideProps({ req, res, params }) {
  const { id } = params;
  const queryClient = new QueryClient();

  let gate;

  try {
    gate = await (req.cookies.token
      ? gqlMethodsWithRefresh(
          req.cookies.token,
          req.cookies.refresh,
          req.cookies.user_id,
          async ({ refresh_token, token }) => {
            res.setHeader('Set-Cookie', [
              `refresh=${refresh_token}; path=/; httpOnly; SameSite=Strict;`,
              `token=${token}; path=/; httpOnly; SameSite=Strict;`,
            ]);

            await queryClient.prefetchQuery(['token'], () => ({
              refresh_token,
              token,
            }));
          }
        )
      : gqlAnonMethods
    ).gate({ id });
  } catch (e) {
    gate = await gqlAnonMethods.gate({ id });
  }

  if (!gate.gates_by_pk) {
    return {
      redirect: {
        destination: ROUTES.EXPLORE,
        permanent: false,
      },
    };
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

  const { gqlAuthMethods } = useAuth();

  const { data: gatesData } = useQuery(['gate', id], () =>
    gqlAuthMethods.gate({
      id,
    })
  );

  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          overflow: '',
          pt: 2,
        },
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
      <GateViewTemplate gateProps={gatesData.gates_by_pk} />
    </DashboardTemplate>
  );
}
