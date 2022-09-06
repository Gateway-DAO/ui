import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { dehydrate, QueryClient, useQuery } from 'react-query';

import { Navbar } from '../../components/organisms/navbar';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { GateViewTemplate } from '../../components/templates/gate-view';
import { useAuth } from '../../providers/auth';
import { gqlAnonMethods } from '../../services/api';

export async function getStaticProps({ params }) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['gate', id], () =>
    gqlAnonMethods.gate({ id })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { gates } = await gqlAnonMethods.all_gates();

  return {
    paths: gates.map((gate) => ({ params: { id: gate.id } })),
    fallback: true,
  };
};

// TODO: implement server side rendering
export default function GateProfilePage() {
  const router = useRouter();

  const id = router.query.id as string;

  const { gqlAuthMethods } = useAuth();

  const { data: gatesData, isLoading } = useQuery(['gate', id], () =>
    gqlAuthMethods.gate({
      id,
    })
  );

  useEffect(() => {
    if (!isLoading && !gatesData?.gates_by_pk) {
      router.push('/home');
    }
  }, [gatesData?.gates_by_pk, isLoading]);

  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          overflow: '',
          pt: 2,
        },
      }}
    >
      <Navbar isInternalPage={true} />
      {!isLoading && gatesData?.gates_by_pk && (
        <GateViewTemplate gateProps={gatesData.gates_by_pk} />
      )}
    </DashboardTemplate>
  );
}
