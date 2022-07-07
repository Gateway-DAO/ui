import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { TOKENS } from '@gateway/theme';
import { MotionBox } from '@gateway/ui';

import { Box, Stack, Typography } from '@mui/material';

import { LandingTitleLimiter } from '../styles';
import Title from '../title';
import { forUsersProps } from './types';

export function ForUsers({
  mainTitle,
  secondaryTitle,
  features,
}: forUsersProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const myRefs = useRef([]);

  const scrollDefinitions = (index) => {
    const threshold = 250;

    return {
      max: myRefs.current[index].offsetTop - threshold,
      min: myRefs.current[index].offsetTop - 2 * threshold,
    };
  };

  const scrollTo = (index) => {
    window.scrollTo({
      top: scrollDefinitions(index).min + 50,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    function handleScrollEvent() {
      if (
        window.scrollY >= scrollDefinitions(activeIndex).max &&
        window.scrollY <
          scrollDefinitions(myRefs.current.length - 1).max + 50 &&
        activeIndex < myRefs.current.length - 1
      ) {
        setActiveIndex(activeIndex + 1);
      } else if (
        window.scrollY < scrollDefinitions(activeIndex).min &&
        activeIndex > 0 &&
        window.scrollY > scrollDefinitions(0).min - 1
      ) {
        setActiveIndex(activeIndex - 1);
      }
    }

    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, [activeIndex]);

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
            ref={(el) => (myRefs.current[index] = el)}
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
