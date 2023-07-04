export type Image = {
  url: string;
  width: number;
  height: number;
};

export type Features = {
  title: string;
  description: string;
  image: Image;
};

export type FeaturedProps = {
  comingSoon?: string;
  mainTitle: string;
  id?: string;
  secondaryTitle: string;
  features: Features[];
};
