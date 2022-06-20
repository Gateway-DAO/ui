import { useRouter } from 'next/router';

import { EarnCredentialTemplate } from '../../../../components/templates/earn-credential';

export default function EarnCredential() {
  const router = useRouter();
  const { credentialId } = router.query;

  return <EarnCredentialTemplate credentialId={credentialId} />;
}
