import Image from 'next/image';
import React, { useRef } from 'react';

import { TOKENS } from '@gateway/theme';
import { MotionBox } from '@gateway/ui';

import { Box, Stack, Typography } from '@mui/material';

import { useActiveScroll } from '../../../../hooks/use-active-scroll';
import { LandingTitleLimiter } from '../styles';
import Title from '../title';
import { FeaturedProps } from './types';

export function Featured({
  mainTitle,
  secondaryTitle,
  features,
}: FeaturedProps): JSX.Element {
  const myRefs = useRef<HTMLDivElement[]>([]);
  const { activeIndex, scrollTo } = useActiveScroll(myRefs);

  return (
    <Box
      component="section"
      id="users"
      sx={(theme) => ({
        paddingTop: theme.spacing(26),
        paddingBottom: theme.spacing(14),
        flex: 1,
        width: '100%',
        px: TOKENS.CONTAINER_PX,
      })}
    >
      <Title>
        <LandingTitleLimiter>{mainTitle}</LandingTitleLimiter>
      </Title>
      <Typography
        component="h2"
        variant="subtitle1"
        sx={(theme) => ({
          color: theme.palette.secondary.main,
          marginTop: '32px',
          maxWidth: '368px',
        })}
      >
        {secondaryTitle}
      </Typography>
      <Stack>
        {features.map((feature, index) => (
          <Box
            key={feature.title}
            id={`item${index}`}
            onClick={() => scrollTo(index)}
            sx={{
              position: 'relative',
              borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
            }}
            ref={(el: HTMLDivElement) => (myRefs.current[index] = el)}
          >
            <Box sx={{ cursor: 'pointer', py: '64px' }}>
              <Typography
                component="h3"
                variant="h4"
                sx={(theme) => ({
                  color:
                    activeIndex === index
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                })}
              >
                {feature.title}
              </Typography>
              <Typography
                component="p"
                sx={(theme) => ({
                  marginTop: '16px',
                  color:
                    activeIndex === index
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                })}
              >
                {feature.description}
              </Typography>
            </Box>
            <MotionBox
              animate={activeIndex === index ? 'active' : 'inactive'}
              variants={{
                active: { opacity: 1, y: '-50%' },
                inactive: { opacity: 0, y: '-30%' },
              }}
              sx={{
                position: 'absolute',
                top: '50%',
                right: '0',
              }}
              transition={{
                ease: 'easeOut',
                duration: 0.75,
                opacity: { duration: 0.5 },
              }}
            >
              <Image
                layout="raw"
                src={feature.image}
                width={640}
                height={500}
                alt={feature.title}
              />
            </MotionBox>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
