import { ReceivedTab } from '../../components/templates/profile/tabs';

import { useAuth } from '../../providers/auth';
import { PrivateProfileTemplate } from '../../components/templates/profile';

// TODO: make the behavior of this page better
export default function PrivateReceivedProfile() {
  const { me } = useAuth();

  return me?.id ? (
    <>
      <ReceivedTab user={me} />
    </>
  ) : null;
}

PrivateReceivedProfile.auth = true;
PrivateReceivedProfile.PageLayout = PrivateProfileTemplate;
