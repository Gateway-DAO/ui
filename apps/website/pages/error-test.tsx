import { useMutation } from 'react-query';

export default function ErrorTest() {
  const apiTest = useMutation(() => fetch('/api/error-test'));
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          throw new Error('Sentry Frontend Error');
        }}
      >
        Throw error
      </button>
      <button type="button" onClick={() => apiTest.mutate()}>
        Call API error
      </button>
    </div>
  );
}
