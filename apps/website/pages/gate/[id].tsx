import { useRouter } from 'next/router';

import { useQuery } from 'react-query';

import { Navbar } from '../../components/organisms/navbar';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { GateViewTemplate } from '../../components/templates/gate-view';
import { useAuth } from '../../providers/auth';

// TODO: implement server side rendering
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
      <Navbar isInternalPage={true} />
      <GateViewTemplate gateProps={gatesData?.gates_by_pk} />
    </DashboardTemplate>
  );
}
