import { PartialDeep } from 'type-fest';

import { Avatar, AvatarProps } from '@mui/material';

import { useFile } from '../../hooks/use-file';
import { Files } from '../../services/graphql/types.generated';

type AvatarFileProps<
  Component extends React.ElementType = 'div',
  Props = Record<string, unknown>
> = {
  file: PartialDeep<Files>;
  fallback?: string;
} & AvatarProps<Component, Props>;

/* Avatar with File image */
export function AvatarFile<Component extends React.ElementType>({
  file,
  fallback = '/logo.png',
  ...props
}: AvatarFileProps<Component, { component?: Component }>) {
  const image = useFile(file);

  const src = image?.url ?? fallback;

  return (
    <Avatar
      {...props}
      sx={{
        ...props?.sx,
        ...image?.background,
      }}
      src={src}
    />
  );
}
