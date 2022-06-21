import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { ROUTES } from '../../../../constants/routes';
import { useSnackbar } from '../../../../hooks/use-snackbar';
import { gqlMethods } from '../../../../services/api';
import { Users } from '../../../../services/graphql/types.generated';
import { Form } from './form';
import { schema, EditUserSchema, defaultValues } from './schema';

type Props = {
  user: Partial<Users>;
};

export function EditProfileTemplate({ user }: Props) {
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
      {
        id: user.id,
        pfp: 'pfpurl',
        ...data,
        discord_id: null,
      },
      {
        onSuccess: () => router.push('/profile'),
      }
    );
  };

  const methods = useForm<EditUserSchema>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues(user),
  });

  return (
    <div>
      <FormProvider {...methods}>
        <Form
          onSubmit={onSubmit}
          userData={user}
          isLoading={updateMutation.isLoading}
        />
      </FormProvider>
      <div style={{ height: '20vh' }}></div>
    </div>
  );
}
