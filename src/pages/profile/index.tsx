import { PrivateProfile } from '@/components/features/profile';
import { ReceivedTab } from '@/components/features/profile/tabs';
import { useAuth } from '@/providers/auth';

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

PrivateReceivedProfile.PageLayout = PrivateProfile;
