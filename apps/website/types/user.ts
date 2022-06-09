import {
  Get_Current_UserQuery,
  LoginMutation,
} from '../services/graphql/types.generated';

export type SessionUser = Get_Current_UserQuery['me'] & LoginMutation['login'];
