import { ReactNode, useMemo } from 'react';

import { useBreakpointValue } from '@/hooks/use-breakpoint';
import { GatewayTheme, TOKENS } from '@/theme';
import { A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Box, Stack, Typography, useTheme } from '@mui/material';
import { SystemCssProperties } from '@mui/system';

export type SectionWithSliderProps = {
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
}: SectionWithSliderProps) {
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
          <Typography variant="caption" color="text.secondary">
            {caption}
          </Typography>
        </Box>
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        >
          {action}
        </Box>
      </Stack>
      <Swiper
        modules={[A11y]}
        slidesPerView="auto"
        spaceBetween={8}
        slidesOffsetBefore={offset}
        slidesOffsetAfter={offset}
      >
        {children?.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
      <Box
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
          px: TOKENS.CONTAINER_PX,
          mt: 2,
        }}
      >
        {action}
      </Box>
    </Box>
  );
}
