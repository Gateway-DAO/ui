import { TOKENS } from '@gateway/theme';

import { Box } from '@mui/material';

import { NewsItem } from './news-item';

export function NewsSection() {
  return (
    <Box
      display="grid"
      sx={{
        gridTemplateColumns: { md: '1.5fr 1fr' },
        gridTemplateRows: { md: '1fr 1fr' },
        gap: 2,
        px: TOKENS.CONTAINER_PX,
      }}
    >
      <NewsItem
        isBig
        sx={{
          gridRow: {
            xs: 1,
            md: '1/3',
          },
        }}
      />
      <NewsItem />
      <NewsItem />
    </Box>
  );
}
