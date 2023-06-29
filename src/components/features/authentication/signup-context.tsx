import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';

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
  type: 'NEW_USER' | 'SET_EMAIL' | 'SET_GATEWAY_ID' | 'COMPLETE';
  payload?: {
    email?: string;
    exists?: boolean;
  };
};

const initialState: State = {
  step: 'initial',
};

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
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
  step: AuthStep;
  onNewUser: () => void;
  onSumbitEmail: (email: string) => void;
  onSubmitVerificationCode: () => void;
  onCompleteLogin: () => void;
};

export const SignUpContext = createContext<Context>({
  step: 'initial',
  onNewUser: () => {},
  onSumbitEmail: () => {},
  onSubmitVerificationCode: () => {},
  onCompleteLogin: () => {},
});

export function SignUpProvider({ children }: PropsWithChildren<unknown>) {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const onSubmitVerificationCode = () => {
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
        step: state.step,
        onNewUser,
        onSumbitEmail,
        onSubmitVerificationCode,
        onCompleteLogin,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}

export const useSignUpContext = () => useContext(SignUpContext);
