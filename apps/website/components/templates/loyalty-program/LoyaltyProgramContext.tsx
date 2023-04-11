import { PropsWithChildren, createContext, useContext, useState } from 'react';

export const LoyaltyProgramContext = createContext<any>(null);
export const useLoyaltyProgramContext = () => useContext(LoyaltyProgramContext);

export const LayoutProgramContextProvider = ({
  children,
}: PropsWithChildren<any>) => {
  const [totalPoints, setTotalPoints] = useState<number>(0);

  return (
    <LoyaltyProgramContext.Provider value={{ totalPoints, setTotalPoints }}>
      {children}
    </LoyaltyProgramContext.Provider>
  );
};
