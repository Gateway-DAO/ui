import { PropsWithChildren, ReactNode, useMemo } from 'react';

import { A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { GatewayTheme, TOKENS } from '@gateway/theme';
import { useBreakpointValue } from '@gateway/ui';

import { Box, Stack, Typography, useTheme } from '@mui/material';
import { SystemCssProperties } from '@mui/system';

type Props = {
  title: string;
  caption: string;
  action: ReactNode;
  children: ReactNode[];
  itemWidth?: SystemCssProperties<GatewayTheme>['width'];
  stretch?: boolean;
};

export function SectionWithSlider({
  title,
  caption,
  action,
  children,
  itemWidth,
  stretch = true,
}: Props) {
  const theme = useTheme();
  const padding = useBreakpointValue(TOKENS.CONTAINER_PX);
  const offset = useMemo(
    () => parseInt(theme.spacing(padding).replace('px', '')),
    [padding]
  );
  return (
    <Box
      component="section"
      sx={{
        '.swiper-slide': {
          width: itemWidth ?? 'auto',
          ...(stretch && {
            height: 'auto',
            display: 'flex',
            alignItems: 'stretch',
            '> :first-of-type': {
              width: '100%',
            },
          }),
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={TOKENS.CONTAINER_PX}
        mb={4}
      >
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="caption">{caption}</Typography>
        </Box>
        {action}
      </Stack>
      <Swiper
        modules={[A11y]}
        slidesPerView="auto"
        spaceBetween={8}
        slidesOffsetBefore={offset}
        slidesOffsetAfter={offset}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
