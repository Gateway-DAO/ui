import { PropsWithChildren } from 'react';

import { TOKENS } from '@gateway/theme';

import { Divider, Stack, Typography } from '@mui/material';

import { Navbar } from '../../organisms/navbar/navbar';

type TemplateProps = {
  title: string;
};

export function HomeTemplate({
  title,
  children,
}: PropsWithChildren<TemplateProps>) {
  return (
    <>
      <Navbar />
      <Typography
        variant="h4"
        whiteSpace="pre-line"
        px={TOKENS.CONTAINER_PX}
        pt={6}
      >
        {title}
      </Typography>
      <Stack
        direction="column"
        divider={<Divider />}
        sx={{
          section: {
            py: 4,
          },
        }}
      >
        {children}
      </Stack>
    </>
  );
}
