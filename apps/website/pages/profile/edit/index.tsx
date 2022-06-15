import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { ROUTES } from '../../../constants/routes';
import { useSnackbar } from '../../../hooks/use-snackbar';
import { gqlMethods } from '../../../services/api';
import { Form } from './form';
import { schema, EditUserSchema, defaultValues } from './schema';

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
  const router = useRouter();
  const session = useSession();
  const snackbar = useSnackbar();

  const updateMutation = useMutation(
    'updateProfile',
    session.data?.user && gqlMethods(session.data.user).update_user_profile,
    {
      onSuccess() {
        snackbar.handleClick({ message: 'Profile updated!' });
        router.push(ROUTES.PROFILE);
      },
    }
  );

  const onSubmit = (data: EditUserSchema) => {
    // TODO: Image upload
    updateMutation.mutate(
      { id: me.id, pfp: me.pfp, ...data },
      {
        onSuccess: () => router.push('/profile'),
      }
    );
  };

  const me = editProfileProps.me;
  const methods = useForm<EditUserSchema>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues(me),
  });

  return (
    <div>
      <FormProvider {...methods}>
        <Form
          onSubmit={onSubmit}
          userData={me}
          isLoading={updateMutation.isLoading}
        />
      </FormProvider>
      <div style={{ height: '20vh' }}></div>
    </div>
  );
};

export default EditProfile;
