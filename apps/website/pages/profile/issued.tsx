import { IssuedTab, ReceivedTab } from 'apps/website/components/templates/profile/tabs';

import { useAuth } from '../../providers/auth';
import { PrivateProfileTemplate } from 'apps/website/components/templates/profile';

// TODO: make the behavior of this page better
export default function PrivateIssuedProfile() {
  const { me } = useAuth();

  return me?.id ? (
    <>
      <IssuedTab user={me} />
    </>
  ) : null;
}

PrivateIssuedProfile.auth = true;
PrivateIssuedProfile.PageLayout = PrivateProfileTemplate;
