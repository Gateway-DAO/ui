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
  const {
    state: { step },
    onNewUser,
    onGoToSetGatewayId,
  } = useSignUpContext();
  const { me } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(me?.init, me?.protocol?.isCompleted, step);
    if (me) {
      if (me?.init && me?.protocol?.isCompleted) {
        router.replace((router.query?.redirect as string) ?? ROUTES.EXPLORE);
      } else if (!me?.email_address && step !== 'set-email') {
        onNewUser();
      } else if (step !== 'set-gatewayid') {
        onGoToSetGatewayId();
      }
    }
  }, [me?.init, me?.protocol?.isCompleted, step]);

  return (
    <>
      {step === 'initial' && <AuthenticationMethods />}
      {step === 'set-email' && <ChooseEmail />}
      {step === 'code-verification' && <VerifyToken />}
      {step === 'set-gatewayid' && <ChooseGatewayId />}

      <ConnectMoreAuthDialog
        open={step === 'completed'}
        onClose={() => {
          console.log('WAWAW');
        }}
      />
    </>
  );
}
