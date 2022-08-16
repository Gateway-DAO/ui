import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { CreateGateTemplate } from '../../components/templates/create-gate';
import { ROUTES } from '../../constants/routes';
import { gqlAnonMethods } from '../../services/api';

export default function CreateGate({ gateProps }) {
  const router = useRouter();

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

  return <CreateGateTemplate oldData={gateProps} />;
}

export async function getServerSideProps({ query }) {
  const { gate: gateId } = query;
  let gateProps = { gates_by_pk: {} };

  if (gateId) {
    gateProps = await gqlAnonMethods.gate({
      id: gateId,
    });
  }

  return {
    props: {
      gateProps: gateProps.gates_by_pk,
    },
  };
}

CreateGate.auth = true;
