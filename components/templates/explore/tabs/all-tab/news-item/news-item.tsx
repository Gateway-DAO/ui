import { ArrowForward } from '@mui/icons-material';
import { BoxProps, Button, Stack, Typography } from '@mui/material';

import { NewsContainer } from './containers';
import { NewsImage } from './image';
import { NewsTitle } from './title';
import { NewsProp } from './type';

export const NewsItem = ({ isBig, ...props }: NewsProp & Partial<BoxProps>) => (
  <NewsContainer {...{ isBig, ...props }}>
    <Stack
      direction="column"
      justifyContent="space-between"
      height="100%"
      position="relative"
      zIndex={2}
      width="75%"
    >
      <Typography variant="body2">Dao</Typography>
      <Stack
        direction="column"
        sx={{
          gap: isBig ? 4 : 1,
          alignItems: 'flex-start',
          mt: isBig
            ? {
                xs: 23.25,
                md: 0,
              }
            : 4.75,
        }}
      >
        <Stack direction="column" sx={{ gap: isBig ? 1 : 0.5 }}>
          <NewsTitle isBig={isBig}>
            {'Join the All Mighty\nGods of OlympusDAO.'}
          </NewsTitle>
          {isBig && (
            <Typography variant="body1">
              Explore the Onboarding Gates
            </Typography>
          )}
        </Stack>
        <Button
          variant={isBig ? 'contained' : 'text'}
          color={!isBig ? 'secondary' : undefined}
          sx={{
            marginLeft: !isBig && -0.75,
          }}
        >
          Explore Now {!isBig && <ArrowForward />}
        </Button>
      </Stack>
    </Stack>
    <NewsImage
      title="OlympusDao"
      src="https://www.fillmurray.com/200/300"
      isBig={isBig}
    />
  </NewsContainer>
);
