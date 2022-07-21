import { InferGetStaticPropsType } from 'next';

import { PrivateProfileTemplate } from '../../components/templates/profile';
import { gqlAnonMethods } from '../../services/api';

export const getStaticProps = async () => {
  const exploreProps = await gqlAnonMethods.get_home();

  return {
    props: {
      exploreProps,
    },
    revalidate: 10,
  };
};

export default function Profile() {
  return <PrivateProfileTemplate />;
}
