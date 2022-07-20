import { createContext, PropsWithChildren, useContext } from 'react';

import { PartialDeep } from 'type-fest';

import { Daos } from '../../../services/graphql/types.generated';

type DaoProfileContextProps = {
  isAdmin: boolean;
  dao: PartialDeep<Daos>;
};

export const DaoProfileContext = createContext<DaoProfileContextProps>({
  dao: {},
  isAdmin: false,
});
export const useDaoProfile = () => useContext(DaoProfileContext);

export const DaoProfileProvider = ({
  dao,
  isAdmin,
  children,
}: PropsWithChildren<DaoProfileContextProps>) => {
  return (
    <DaoProfileContext.Provider value={{ dao, isAdmin }}>
      {children}
    </DaoProfileContext.Provider>
  );
};
