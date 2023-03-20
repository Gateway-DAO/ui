import { createContext, PropsWithChildren, useContext } from 'react';

import { PartialDeep } from 'type-fest';

import {
  Credential,
  GetDaoStatsQuery,
} from '../../../services/gateway-protocol/types';
import { Daos, Dao_Gates_TabQuery } from '../../../services/hasura/types';

type DaoProfileContextProps = {
  isAdmin: boolean;
  dao: PartialDeep<Daos>;
  followersCount: number;
  credentials?: Dao_Gates_TabQuery;
  onRefetchFollowers: () => void;
  issuedCredentials?: PartialDeep<Credential>[];
  stats?: GetDaoStatsQuery;
};

export const DaoProfileContext = createContext<DaoProfileContextProps>({
  dao: {},
  followersCount: 0,
  isAdmin: false,
  onRefetchFollowers: () => {},
});
export const useDaoProfile = () => useContext(DaoProfileContext);

export const DaoProfileProvider = ({
  children,
  ...props
}: PropsWithChildren<DaoProfileContextProps>) => {
  return (
    <DaoProfileContext.Provider value={props}>
      {children}
    </DaoProfileContext.Provider>
  );
};
