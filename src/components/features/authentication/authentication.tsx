import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';

import { ChooseEmail } from './sections/choose-email';
import { ChooseGatewayId } from './sections/choose-gateway-id';
import { ConnectMoreAuthDialog } from './sections/completed';
import { AuthenticationInitial } from './sections/initial';
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
      if (step === 'completed') {
        return;
      } else if (
        !me?.email_address &&
        !me?.protocolUser?.gatewayId &&
        step !== 'choose-gatewayid'
      ) {
        console.log(me?.protocolUser);
        onNewUser();
      } else if (step !== 'choose-email' && step !== 'verify-email-add-code') {
        onGoToSetGatewayId();
      } else if (
        !me?.protocolUser?.gatewayId &&
        me?.email_address &&
        step !== 'choose-gatewayid'
      ) {
        onGoToSetGatewayId();
      }
      if (me?.protocolUser?.gatewayId) {
        router.push((router.query?.redirect as string) ?? ROUTES.EXPLORE);
      }
    }
  }, [me?.protocolUser?.gatewayId, me?.email_address, step]);

  return (
    <>
      {step === 'initial' && <AuthenticationInitial />}
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
