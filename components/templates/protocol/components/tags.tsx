import { Maybe } from 'graphql/jsutils/Maybe';

import { Chip, Stack } from '@mui/material';

import { Scalars } from '@/services/gateway-protocol/types';

type Props = {
  tags: Maybe<Array<Scalars['String']>>;
};

export default function Tags({ tags }: Props) {
  return (
    <>
      {tags?.length > 0 && (
        <Stack direction="row" gap={1} sx={{ mb: 2 }}>
          {tags.map((tag, index) => (
            <Chip label={tag} key={index} size="small" />
          ))}
        </Stack>
      )}
    </>
  );
}
