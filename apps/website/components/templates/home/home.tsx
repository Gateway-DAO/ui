import { PropsWithChildren } from 'react';

import { TOKENS } from '@gateway/theme';

import { Divider, Stack, Typography } from '@mui/material';

import { Navbar } from '../../organisms/navbar/navbar';
import { DashboardTemplate, type DashboardTemplateProps } from '../dashboard';

type Props = {
  title: string;
  DashboardProps?: DashboardTemplateProps;
};

export function HomeTemplate({
  title,
  DashboardProps,
  children,
}: PropsWithChildren<Props>) {
  return (
    <DashboardTemplate
      {...DashboardProps}
      containerProps={{
        ...DashboardProps?.containerProps,
        sx: {
          pt: 2,
          overflow: 'hidden',
          ...DashboardProps?.containerProps?.sx,
        },
      }}
    >
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
    </DashboardTemplate>
  );
}
