import { createContext, PropsWithChildren, useContext } from 'react';

import { PartialDeep } from 'type-fest';

import {
  Daos,
  Dao_Profile_PeopleQuery,
} from '../../../services/graphql/types.generated';

type DaoProfileContextProps = {
  isAdmin: boolean;
  dao: PartialDeep<Daos>;
  followers?: Dao_Profile_PeopleQuery;
  followersIsLoaded: boolean;
  onRefetchFollowers: () => void;
};

export const DaoProfileContext = createContext<DaoProfileContextProps>({
  dao: {},
  isAdmin: false,
  followersIsLoaded: false,
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
