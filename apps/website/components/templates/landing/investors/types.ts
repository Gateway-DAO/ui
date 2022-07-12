export type Investor = {
  name: string;
  url: string;
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
