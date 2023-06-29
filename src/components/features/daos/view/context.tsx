import { createContext, PropsWithChildren, useContext } from 'react';

import {
  Daos,
  Dao_Gates_TabQuery,
  Loyalty_Program,
  Protocol_Api_Credential,
  Protocol_Get_Dao_StatsQuery,
} from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

type DaoProfileContextProps = {
  isAdmin: boolean;
  dao: PartialDeep<Daos>;
  followersCount: number;
  credentialsDirectType?: Dao_Gates_TabQuery;
  credentialsTaskType?: Dao_Gates_TabQuery;
  loyaltyPrograms?: PartialDeep<Loyalty_Program>[];
  onRefetchFollowers: () => void;
  issuedCredentials?: PartialDeep<Protocol_Api_Credential>[];
  stats?: Protocol_Get_Dao_StatsQuery;
  openCredentialCreationDialog: boolean;
  setOpenCredentialCreationDialog: (nextValue?: any) => void;
  openCreateQuestDialog: boolean;
  setOpenCreateQuestDialog: (nextValue?: any) => void;
};

export const DaoProfileContext = createContext<DaoProfileContextProps>({
  dao: {},
  followersCount: 0,
  loyaltyPrograms: [],
  isAdmin: false,
  onRefetchFollowers: () => {},
  openCredentialCreationDialog: false,
  openCreateQuestDialog: false,
  setOpenCredentialCreationDialog: () => {},
  setOpenCreateQuestDialog: () => {},
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
