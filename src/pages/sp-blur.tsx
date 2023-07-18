import { SpiceFiTemplate } from '@/components/features/spicefi';
import { HeadContainer } from '@/components/molecules/head-container';
import { Navbar } from '@/components/organisms/navbar';
import { DashboardTemplate } from '@/components/templates/dashboard';

import { Box } from '@mui/material';

export default function SpiceFiBlur() {
  return (
    <>
      <HeadContainer title="SP-Blur" ogImage="default" />
      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: '',
            pt: 2,
            display: {
              md: 'flex',
            },
          },
        }}
      >
        <Box
          sx={{
            display: {
              xs: 'flex',
              md: 'none',
            },
          }}
        >
          <Navbar isInternalPage={true} />
        </Box>
        <SpiceFiTemplate />
      </DashboardTemplate>
    </>
  );
}
