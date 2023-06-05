import { PrivateProfile } from '@/components/features/profile';
import { Earned } from '@/components/features/profile/tabs/Earned';
import { useAuth } from '@/providers/auth';

export default function PrivateEarnedProfile() {
  const { me } = useAuth();

  return me?.id ? (
    <>
      <Earned user={me} />
    </>
  ) : null;
}

PrivateEarnedProfile.auth = true;
PrivateEarnedProfile.PageLayout = PrivateProfile;