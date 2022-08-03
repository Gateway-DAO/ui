import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { CreateGateTemplate } from '../../components/templates/create-gate';
import { ROUTES } from '../../constants/routes';

export default function CreateGate() {
  const router = useRouter();

  const {
    isReady,
    query: { dao },
  } = router;

  useEffect(() => {
    if (isReady && !dao) {
      router.replace(ROUTES.EXPLORE);
    }
  }, [dao, isReady]);

  if (!dao) {
    return null;
  }

  return <CreateGateTemplate />;
}

CreateGate.auth = true;
