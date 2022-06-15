import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { EditProfileTemplate } from '../../../components/templates/profile/edit/edit';
import { gqlMethods } from '../../../services/api';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const editProfileProps = await gqlMethods(session.user).get_current_user();

  return {
    props: {
      editProfileProps,
    },
  };
};

const EditProfile = ({
  editProfileProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <EditProfileTemplate user={editProfileProps.me} />;
};

export default EditProfile;
