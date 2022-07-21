import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { useAuth } from '../providers/auth';

export default function Test() {
  const { me, gqlAuthMethods, onUpdateMe } = useAuth();

  const { register, handleSubmit } = useForm();

  const mutation = useMutation(gqlAuthMethods.me, {
    onSuccess(data) {
      console.log('Data succ', data);
    },
  });

  const onSubmit = (data) => {
    console.log(data.token);
    onUpdateMe((oldMe) => ({ ...oldMe, token: data.token }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea value={me?.token} />
      <textarea {...register('token')} />
      <button type="submit">Submit</button>
      <br />
      <button type="button" onClick={() => mutation.mutate({})}>
        Test
      </button>
    </form>
  );
}
