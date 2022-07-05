import { MeQuery, LoginMutation } from '../services/graphql/types.generated';

export type SessionUser = Omit<
  MeQuery['me'] & LoginMutation['login'],
  '__typename'
> & { __typename?: any };
