import { useRouter } from 'next/router';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { SessionUser } from '@/types/user';

export type AuthStep =
  | 'initial'
  | 'verify-email-login-code'
  | 'choose-email'
  | 'verify-email-add-code'
  | 'choose-gatewayid'
  | 'completed';

type State = {
  step: AuthStep;
  email?: string;
};

type Action = {
  type:
    | 'RESET'
    | 'NEW_USER'
    | 'NEW_USER_CODE'
    | 'SET_EMAIL'
    | 'SET_GATEWAY_ID'
    | 'COMPLETE';
  payload?: {
    email?: string;
    exists?: boolean;
  };
};

const initialState: State = {
  step: 'initial',
};

const initializeState = (me: SessionUser): State => {
  let step = initialState.step;
  if (me) {
    if (!me.email_address) {
      step = 'choose-email';
    } else if (!me.username) {
      step = 'choose-gatewayid';
    } else {
      step = 'completed';
    }
  }

  return {
    ...initialState,
    step,
  };
};

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'RESET':
      return initialState;
    case 'SET_EMAIL':
      return {
        ...state,
        step: 'verify-email-login-code',
        email: action.payload?.email,
      };
    case 'NEW_USER':
      return {
        ...state,
        step: 'choose-email',
      };
    case 'NEW_USER_CODE':
      return {
        ...state,
        email: action.payload?.email,
        step: 'verify-email-add-code',
      };
    case 'SET_GATEWAY_ID':
      return {
        ...state,
        step: 'choose-gatewayid',
      };
    case 'COMPLETE':
      return {
        ...state,
        step: 'completed',
      };
    default:
      return state;
  }
};

type Context = {
  state: State;
  onReset: () => void;
  onNewUser: () => void;
  onNewUserSubmitEmail: (email: string) => void;
  onSubmitEmail: (email: string) => void;
  onGoToSetGatewayId: () => void;
  onCompleteLogin: () => void;
};

export const SignUpContext = createContext<Context>({
  state: initialState,
  onReset: () => {},
  onNewUser: () => {},
  onNewUserSubmitEmail: () => {},
  onSubmitEmail: () => {},
  onGoToSetGatewayId: () => {},
  onCompleteLogin: () => {},
});

export function SignUpProvider({ children }: PropsWithChildren<unknown>) {
  const { me } = useAuth();

  const [state, dispatch] = useReducer(reducer, initializeState(me));
  const router = useRouter();

  const onReset = () => {
    dispatch({
      type: 'RESET',
    });
  };

  const onNewUser = () => {
    dispatch({
      type: 'NEW_USER',
    });
  };

  const onNewUserSubmitEmail = (email: string) => {
    dispatch({
      type: 'NEW_USER_CODE',
      payload: {
        email,
      },
    });
  };

  const onSubmitEmail = (email: string) => {
    dispatch({
      type: 'SET_EMAIL',
      payload: {
        email,
      },
    });
  };

  const onGoToSetGatewayId = () => {
    dispatch({
      type: 'SET_GATEWAY_ID',
    });
  };

  const onCompleteLogin = () => {
    // Temporarly disabled
    dispatch({
      type: 'COMPLETE',
    });
    // router.push((router.query?.redirect as string) ?? ROUTES.EXPLORE);
  };

  return (
    <SignUpContext.Provider
      value={{
        state,
        onReset,
        onNewUser,
        onNewUserSubmitEmail,
        onSubmitEmail,
        onGoToSetGatewayId,
        onCompleteLogin,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}

export const useSignUpContext = () => useContext(SignUpContext);
