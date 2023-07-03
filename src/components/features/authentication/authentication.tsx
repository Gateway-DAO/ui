import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';

import { ConnectMoreAuthDialog } from './components/connect-more-auth-dialog';
import { AuthenticationMethods } from './sections/authentication-methods';
import { ChooseEmail } from './sections/choose-email';
import { ChooseGatewayId } from './sections/choose-gateway-id';
import { VerifyToken } from './sections/verify-token';
import { useSignUpContext } from './signup-context';

export function Authentication() {
  const router = useRouter();
  const { me } = useAuth();
  const {
    state: { step },
    onNewUser,
    onGoToSetGatewayId,
  } = useSignUpContext();

  useEffect(() => {
    if (me) {
      if (step === 'completed') {
        return;
      }
      if (!me?.email_address && step !== 'set-email') {
        onNewUser();
      } else if (!me?.username && step !== 'set-gatewayid') {
        onGoToSetGatewayId();
      }
    }
  }, [me?.username, me?.email_address, step]);

  return (
    <>
      {step === 'initial' && <AuthenticationMethods />}
      {step === 'set-email' && <ChooseEmail />}
      {step === 'code-verification' && <VerifyToken />}
      {step === 'set-gatewayid' && <ChooseGatewayId />}

      <ConnectMoreAuthDialog
        open={step === 'completed'}
        onClose={(router.query?.redirect as string) ?? ROUTES.EXPLORE}
      />
    </>
  );
}
