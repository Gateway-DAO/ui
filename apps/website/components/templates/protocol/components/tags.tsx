import { Maybe } from 'graphql/jsutils/Maybe';

import { theme } from '@gateway/theme';

import { Chip, Stack, useMediaQuery } from '@mui/material';

import { Scalars } from '../../../../services/gateway-protocol/types';

type Props = {
  tags: Maybe<Array<Scalars['String']>>;
};

export default function Tags({ tags }: Props) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  return (
    <>
      {tags?.length > 0 && (
        <Stack direction="row" gap={1} sx={{ mb: 2 }}>
          {tags.map((tag, index) => (
            <Chip
              label={tag}
              key={index}
              size={isMobile ? 'small' : 'medium'}
            />
          ))}
        </Stack>
      )}
    </>
  );
}
