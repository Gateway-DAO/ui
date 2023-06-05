import { PrivateProfile } from '@/components/features/profile';
import { IssuedTab } from '@/components/features/profile/tabs';
import { useAuth } from '@/providers/auth';

export default function PrivateIssuedProfile() {
  const { me } = useAuth();

  return me?.id ? (
    <>
      <IssuedTab user={me} />
    </>
  ) : null;
}

PrivateIssuedProfile.auth = true;
PrivateIssuedProfile.PageLayout = PrivateProfile;
