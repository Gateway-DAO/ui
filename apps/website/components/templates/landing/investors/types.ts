export type Investor = {
  name: string;
  logo?: {
    url: string;
    width: number;
    height: number;
  };
};

export type InvestorProps = {
  title: string;
  investorsWithLogos: Investor[];
  investorsonlyNames: Investor[];
};
