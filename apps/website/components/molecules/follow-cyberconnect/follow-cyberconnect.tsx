import { useBidirectionFollow } from '../../../hooks/use-bidirectional-follow';
import { useAuth } from '../../../providers/auth';
import { useCyberConnect } from '../../../providers/cyberconnect';
import { BiConnState } from '../../../services-cyberconnect/types.generated';
import { LoadingButton } from '../../atoms/loading-button';

/*
Component that manages the follow button for a user:
- If the user is not logged in, it shows as 'Follow' and opens the login modal
- If the user is logged in:
  - Checks the status of the follow request based on cyberconnect data:
    - the user is following: { friends } = useCyberConnect();
    - the user has a semt pending request: { friendRequestsSent } = useCyberConnect();
    - the user has a receoved pending request: { friendRequestsInbox } = useCyberConnect();

- If the user is following, it shows as 'Unfollow'
- If the user has a sent pending request, it shows as 'Pending', and if the user clicks, it shows a dropdown with the option to cancel the request
- If the user has a received pending request, it shows as 'Pending', and if the user clicks, it shows a dropdown with the option to accept or reject the request
*/

export function FollowCyberconnect() {
  return <></>;
}
