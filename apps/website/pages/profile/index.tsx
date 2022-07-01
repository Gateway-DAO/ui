import { InferGetStaticPropsType } from 'next';
import { gqlAdminMethods } from '../../services/api';
import ProfileTemplate from '../../components/templates/profile/ProfileTemplate';

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
