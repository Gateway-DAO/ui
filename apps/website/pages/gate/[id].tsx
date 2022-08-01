import { GetStaticPaths, InferGetStaticPropsType } from 'next';

import { Navbar } from '../../components/organisms/navbar';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { GateViewTemplate } from '../../components/templates/gate-view';
import { gqlAnonMethods } from '../../services/api';

export default function GateProfilePage({
  gateProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!gateProps) return null;
  const { gates_by_pk: gate } = gateProps;
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
      <GateViewTemplate gate={gate} />
    </DashboardTemplate>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { gates } = await gqlAnonMethods.all_gates();

  return {
    paths: gates.map((gate) => ({ params: { id: gate.id } })),
    fallback: 'blocking', //TODO: add loading state and change to fallback: true
  };
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;

  const gateProps = await gqlAnonMethods.gate({
    id,
  });

  return {
    props: {
      gateProps,
    },
    revalidate: 60,
  };
};
