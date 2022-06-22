import { MeQuery, LoginMutation } from '../services/graphql/types.generated';

export type SessionUser = MeQuery['me'] & LoginMutation['login'];
