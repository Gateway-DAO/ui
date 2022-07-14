import { PartialDeep } from 'type-fest';

import { Avatar, AvatarProps } from '@mui/material';

import { useFile } from '../../hooks/use-file';
import { Files } from '../../services/graphql/types.generated';

type Props = {
  file: PartialDeep<Files>;
  fallback?: string;
} & AvatarProps;

/* Avatar with File image */
export function AvatarFile({ file, fallback, ...props }: Props) {
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
