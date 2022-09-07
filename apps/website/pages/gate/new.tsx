import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useQuery } from 'react-query';

import { CreateGateTemplate } from '../../components/templates/create-gate';
import { DraftGateTypes } from '../../components/templates/create-gate/schema';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../providers/auth';
import { gqlAnonMethods } from '../../services/api';
import { GateQuery } from '../../services/graphql/types.generated';

type CreateGateProps = {
  id: string;
  gateProps: GateQuery;
};
export default function CreateGate({ id, gateProps }: CreateGateProps) {
  const router = useRouter();
  const { gqlAuthMethods } = useAuth();

  const { data: oldGateData } = useQuery(
    ['gate', id],
    () =>
      gqlAuthMethods.gate({
        id,
      }),
    {
      initialData: gateProps,
    }
  );

  console.log(oldGateData);

  const {
    isReady,
    query: { dao: daoId },
  } = router;

  useEffect(() => {
    if (isReady && !daoId) {
      router.replace(ROUTES.EXPLORE);
    }
  }, [daoId, isReady, router]);

  if (!daoId) {
    return null;
  }

  return (
    <CreateGateTemplate
      oldData={
        {
          created_by: [oldGateData?.gates_by_pk?.creator.id],
          ...oldGateData?.gates_by_pk,
          id,
        } as DraftGateTypes
      }
    />
  );
}

export async function getServerSideProps({ res, query }) {
  const { gate: gateId } = query;
  let gateProps = { gates_by_pk: { id: '', published: '' } };

  if (gateId) {
    gateProps = await gqlAnonMethods.gate({
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
      id: gateId,
      gateProps,
    },
  };
}

CreateGate.auth = true;
