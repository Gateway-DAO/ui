import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { CreateGateTemplate } from '../../components/templates/create-gate';
import { ROUTES } from '../../constants/routes';

export default function CreateGate() {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.dao) {
      router.replace(ROUTES.EXPLORE);
    }
  }, []);

  if (!router.query.dao) {
    return null;
  }

  return <CreateGateTemplate />;
}

CreateGate.auth = true;
