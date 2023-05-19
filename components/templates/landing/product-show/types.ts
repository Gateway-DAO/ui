type Faeture = {
  title: string;
  description: string;
};

export type ProductShowProps = {
  comingSoon?: string;
  title: string;
  id: string;
  revert: boolean;
  description: string;
  features: Faeture[];
  image: {
    url: string;
    width: number;
    height: number;
  };
};
