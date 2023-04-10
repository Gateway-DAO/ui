import { Divider, Grid, useMediaQuery, useTheme } from '@mui/material';

import { useWindowSize } from '../../../hooks/use-window-size';
import MainContentTemplate from './MainContentTemplate';
import SidebarTemplate from './SidebarTemplate';

type Props = {
  sidebar: React.ReactNode;
  mainContent: React.ReactNode;
};

export default function LoyaltyProgramTemplate({
  sidebar,
  mainContent,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const windowSize = useWindowSize();

  return (
    <>
      <Grid
        container
        height={isMobile ? 'auto' : '100%'}
        sx={{
          flexWrap: 'nowrap',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: `${windowSize.height}px`,
        }}
      >
        <SidebarTemplate>{sidebar}</SidebarTemplate>
        {!isMobile && <Divider orientation="vertical" flexItem />}
        <MainContentTemplate>{mainContent}</MainContentTemplate>
      </Grid>
    </>
  );
}
