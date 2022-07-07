export type forUsersFeature = {
  title: string;
  description: string;
  image: string;
};

export type forUsersProps = {
  mainTitle: string;
  secondaryTitle: string;
  features: forUsersFeature[];
};
