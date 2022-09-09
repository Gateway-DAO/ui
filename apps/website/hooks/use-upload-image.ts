import { useMutation } from '@tanstack/react-query';
import { paramCase } from 'change-case';

import { useAuth } from '../providers/auth';
import { Upload_ImageMutationVariables } from '../services/graphql/types.generated';

export function useUploadImage() {
  const { gqlAuthMethods } = useAuth();

  const uploadMutation = useMutation(
    (variables: Upload_ImageMutationVariables) =>
      gqlAuthMethods.upload_image({
        ...variables,
        name: paramCase(variables.name),
      })
  );

  return uploadMutation.mutateAsync;
}
