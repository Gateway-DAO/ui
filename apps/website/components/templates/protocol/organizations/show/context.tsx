import { createContext, useContext, PropsWithChildren } from 'react';

import { PartialDeep } from 'type-fest';

import {
  Organization,
  Credential,
} from '../../../../../services/gateway-protocol/types';

type OrganizationContextProps = {
  organization: PartialDeep<Organization>;
  credentials: PartialDeep<Credential>[];
};

export const OrganizationProfileContext =
  createContext<OrganizationContextProps>({
    organization: {},
    credentials: [],
  });

export const useOrganizationContext = () =>
  useContext(OrganizationProfileContext);

export const OrganizationProfileProvider = ({
  children,
  ...props
}: PropsWithChildren<OrganizationContextProps>) => {
  return (
    <OrganizationProfileContext.Provider value={props}>
      {children}
    </OrganizationProfileContext.Provider>
  );
};
