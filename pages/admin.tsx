import { InferGetStaticPropsType } from 'next';

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import { AdminTemplate } from '../components/templates/admin';
import { DashboardTemplate } from '../components/templates/dashboard';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '../providers/auth';
import { gqlMethods } from '@/services/hasura/api';
import { getServerSession } from '@/services/next-auth';

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

export async function getServerSideProps({ req, res }) {
  const queryClient = new QueryClient();

  const session = await getServerSession(req, res);

  if (!session) {
    return {
      redirect: {
        destination: ROUTES.EXPLORE,
        permanent: false,
      },
    };
  }

  const { me } = await gqlMethods(session.token, session.hasura_id).me();

  const isAdmin =
    me?.permissions?.filter(
      (permission) =>
        (permission.dao_id === 'b49fa6cc-e752-4e58-bb8d-9c12c5c17685' ||
          permission.dao_id === '5e5275cf-505b-4618-a561-3d16642c77a5') &&
        permission.dao?.is_admin
    ).length > 0;

  if (!isAdmin) {
    return {
      redirect: {
        destination: ROUTES.EXPLORE,
        permanent: false,
      },
    };
  }

  await queryClient.prefetchQuery(
    ['admin-data'],
    async () =>
      await gqlMethods(session.token, session.hasura_id).get_admin_data()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Admin() {
  const { gqlAuthMethods } = useAuth();

  const { data: adminData } = useQuery(['admin-data'], () =>
    gqlAuthMethods.get_admin_data()
  );

  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          pt: 2,
          overflow: 'hidden',
        },
      }}
    >
      <AdminTemplate data={adminData} />
    </DashboardTemplate>
  );
}

Admin.auth = true;
