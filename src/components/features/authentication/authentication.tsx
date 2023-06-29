import { useState } from 'react';

import { ConnectMoreAuthDialog } from './components/connect-more-auth-dialog';
import { AuthenticationMethods } from './sections/authentication-methods';
import { ChooseEmail } from './sections/choose-email';
import { ChooseGatewayId } from './sections/choose-gateway-id';
import { VerifyToken } from './sections/verify-token';
import { SignUpContext } from './signup-context';

export function Authentication() {
  const [signUpSteps, setSignUpSteps] = useState(0);
  const [showConnectMoreAuthDialog, setShowConnectMoreAuthDialog] =
    useState(false);

  const onSuccess = () => {
    setShowConnectMoreAuthDialog(true);
  };

  const signUpProgress = {
    0: <AuthenticationMethods navigateStep={setSignUpSteps} />,
    1: <ChooseEmail navigateStep={setSignUpSteps} />,
    2: <VerifyToken navigateStep={setSignUpSteps} />,
    3: <ChooseGatewayId navigateStep={setSignUpSteps} onSuccess={onSuccess} />,
  };

  return (
    <>
      <SignUpContext.Provider value={{ setSignUpSteps }}>
        {signUpProgress[signUpSteps]}
      </SignUpContext.Provider>
      <ConnectMoreAuthDialog
        open={showConnectMoreAuthDialog}
        setOpen={setShowConnectMoreAuthDialog}
      />
    </>
  );
}
