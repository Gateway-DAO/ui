import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { CreateGateTemplate } from '@/components/templates/create-gate';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { gqlAnonMethods } from '@/services/hasura/api';
import { Get_Create_GateQuery } from '@/services/hasura/types';
import { useQuery } from '@tanstack/react-query';

type CreateGateProps = {
  id: string | null;
  gateProps: Get_Create_GateQuery;
};
export default function CreateGate({ id, gateProps }: CreateGateProps) {
  const router = useRouter();
  const { gqlAuthMethods } = useAuth();
  const { me } = useAuth();

  const { data: oldGateData } = useQuery(
    ['gate', id],
    () =>
      gqlAuthMethods.get_create_gate({
        id,
      }),
    {
      select: (data) => data.gates_by_pk,
      initialData: gateProps,
      enabled: !!id,
    }
  );

  const {
    isReady,
    query: { dao: daoId },
  } = router;

  useEffect(() => {
    if (isReady && !daoId) {
      router.replace(ROUTES.EXPLORE);
    }
  }, [daoId, isReady, router]);

  if (!daoId || !oldGateData) {
    return null;
  }

  return (
    <CreateGateTemplate
      oldData={{
        ...(oldGateData as any),
        creator: oldGateData?.creator ?? { id: me?.id, name: me?.name },
        id,
      }}
    />
  );
}
export async function getServerSideProps({ res, query }) {
  const { gate: gateId } = query;
  let gateProps = { gates_by_pk: { id: '', published: '' } };
  if (gateId) {
    gateProps = await gqlAnonMethods.get_create_gate({
      id: gateId,
    });
  }

  const gateState = gateProps.gates_by_pk?.published;
  if (gateState === 'published' || gateState === 'paused') {
    redirect(
      res,
      ROUTES.GATE_PROFILE.replace('[id]', gateProps.gates_by_pk.id)
    );
  }

  return {
    props: {
      id: gateId || null,
      gateProps,
    },
  };
}

CreateGate.auth = true;
