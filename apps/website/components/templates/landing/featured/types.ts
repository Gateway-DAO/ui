export type Features = {
  title: string;
  description: string;
  image: string;
};

export type FeaturedProps = {
  mainTitle: string;
  id?: string;
  secondaryTitle: string;
  features: Features[];
};
