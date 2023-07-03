import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';

import { ConnectMoreAuthDialog } from './components/connect-more-auth-dialog';
import { AuthenticationMethods } from './sections/authentication-methods';
import { ChooseEmail } from './sections/choose-email';
import { ChooseGatewayId } from './sections/choose-gateway-id';
import { VerifyEmailAddToken } from './sections/verify-email-add-token';
import { VerifyEmailLoginToken } from './sections/verify-email-login-token';
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
      console.log(me, step);
      if (step === 'completed') {
        return;
      }
      if (
        !me?.email_address &&
        step !== 'choose-email' &&
        step !== 'verify-email-add-code'
      ) {
        onNewUser();
      } else if (
        !me?.username &&
        step !== 'choose-gatewayid' &&
        me?.email_address
      ) {
        onGoToSetGatewayId();
      }
      if (me?.username && me?.email_address) {
        router.push((router.query?.redirect as string) ?? ROUTES.EXPLORE);
      }
    }
  }, [me?.username, me?.email_address, step]);

  return (
    <>
      {step === 'initial' && <AuthenticationMethods />}
      {step === 'verify-email-login-code' && <VerifyEmailLoginToken />}
      {step === 'choose-email' && <ChooseEmail />}
      {step === 'verify-email-add-code' && <VerifyEmailAddToken />}
      {step === 'choose-gatewayid' && <ChooseGatewayId />}

      <ConnectMoreAuthDialog
        open={step === 'completed'}
        onClose={(router.query?.redirect as string) ?? ROUTES.EXPLORE}
      />
    </>
  );
}
