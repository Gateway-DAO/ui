import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';

import { useAuth } from '@/providers/auth';
import { SessionUser } from '@/types/user';

export type AuthStep =
  | 'initial'
  | 'set-email'
  | 'code-verification'
  | 'set-gatewayid'
  | 'completed';

type State = {
  step: AuthStep;
  email?: string;
};

type Action = {
  type: 'RESET' | 'NEW_USER' | 'SET_EMAIL' | 'SET_GATEWAY_ID' | 'COMPLETE';
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
      step = 'set-email';
    } else if (!me.username) {
      step = 'set-gatewayid';
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
    case 'NEW_USER':
      return {
        ...state,
        step: 'set-email',
      };
    case 'SET_EMAIL':
      return {
        ...state,
        step: 'code-verification',
        email: action.payload?.email,
      };
    case 'SET_GATEWAY_ID':
      return {
        ...state,
        step: 'set-gatewayid',
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
  onSumbitEmail: (email: string) => void;
  onGoToSetGatewayId: () => void;
  onCompleteLogin: () => void;
};

export const SignUpContext = createContext<Context>({
  state: initialState,
  onReset: () => {},
  onNewUser: () => {},
  onSumbitEmail: () => {},
  onGoToSetGatewayId: () => {},
  onCompleteLogin: () => {},
});

export function SignUpProvider({ children }: PropsWithChildren<unknown>) {
  const { me } = useAuth();

  const [state, dispatch] = useReducer(reducer, initializeState(me));

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

  const onSumbitEmail = (email: string) => {
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
    dispatch({
      type: 'COMPLETE',
    });
  };

  return (
    <SignUpContext.Provider
      value={{
        state,
        onReset,
        onNewUser,
        onSumbitEmail,
        onGoToSetGatewayId,
        onCompleteLogin,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}

export const useSignUpContext = () => useContext(SignUpContext);
