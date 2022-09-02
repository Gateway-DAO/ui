import { InferGetStaticPropsType } from 'next';

import { Navbar } from '../../components/organisms/navbar';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { GateViewTemplate } from '../../components/templates/gate-view';
import { gqlAnonMethods } from '../../services/api';

export default function GateProfilePage({
  gateProps,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
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
      <GateViewTemplate gateProps={gate} />
    </DashboardTemplate>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params;

  if (!id) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  const gateProps = await gqlAnonMethods.gate({
    id,
  });

  if (!gateProps.gates_by_pk) return { notFound: true };

  return {
    props: {
      gateProps,
    },
  };
};
