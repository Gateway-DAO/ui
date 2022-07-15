import { InferGetStaticPropsType } from 'next';

import ProfileTemplate from '../../components/templates/profile/ProfileTemplate';
import { gqlAdminMethods } from '../../services/api';

export const getStaticProps = async () => {
  const exploreProps = await gqlAdminMethods.get_home();

  return {
    props: {
      exploreProps,
    },
    revalidate: 10,
  };
};

export default function Profile({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  return (
    <>
      <ProfileTemplate />
    </>
  );
}
