import { PartialDeep } from 'type-fest';

import { MeQuery, LoginMutation } from '../services/graphql/types.generated';

export type SessionUser = PartialDeep<MeQuery['me'] & LoginMutation['login']>;
