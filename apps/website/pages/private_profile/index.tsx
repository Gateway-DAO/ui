import { InferGetStaticPropsType } from 'next';
import { gqlAdminMethods } from '../../services/api';
import PrivateProfileTemplate from '../../components/templates/private-profile/PrivateProfileTemplate';

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
      <PrivateProfileTemplate />
    </>
  );
}
