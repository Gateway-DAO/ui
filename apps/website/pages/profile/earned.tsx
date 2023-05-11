import { ReceivedTab } from 'apps/website/components/templates/profile/tabs';

import { useAuth } from '../../providers/auth';
import { PrivateProfileTemplate } from 'apps/website/components/templates/profile';
import { Earned } from 'apps/website/components/templates/profile/tabs/Earned';

// TODO: make the behavior of this page better
export default function PrivateEarnedProfile() {
  const { me } = useAuth();

  return me?.id ? (
    <>
      <Earned user={me} />
    </>
  ) : null;
}

PrivateEarnedProfile.auth = true;
PrivateEarnedProfile.PageLayout = PrivateProfileTemplate;
