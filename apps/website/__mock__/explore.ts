import { Get_ExploreQuery } from '../services/graphql/types.generated';

export const mockExplore: Get_ExploreQuery = {
  daos: [],
  gates: [],
  people: [],
  user: {
    id: '',
    email_address: '',
    name: 'Lucas',
    pfp: 'https://www.fillmurray.com/200/300',
    username: 'kbooz',
    gate_progresses: [],
    credentials: [],
  },
};
