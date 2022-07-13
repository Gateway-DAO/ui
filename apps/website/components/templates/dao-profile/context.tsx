import { createContext, PropsWithChildren, useContext } from 'react';

import { PartialDeep } from 'type-fest';

import { Daos } from '../../../services/graphql/types.generated';

const DaoContext = createContext<PartialDeep<Daos>>(undefined);

export const useDao = () => useContext(DaoContext);

export const DaoProvider = ({
  children,
  dao,
}: PropsWithChildren<{ dao: PartialDeep<Daos> }>) => (
  <DaoContext.Provider value={dao}>{children}</DaoContext.Provider>
);
