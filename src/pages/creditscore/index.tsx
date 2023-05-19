import { Box } from '@mui/material';

import { HeadContainer } from '@/components/molecules/head-container';
import { Navbar } from '@/components/organisms/navbar';
import { CreditScoreTemplate } from '@/components/templates/credit-score';
import { DashboardTemplate } from '@/components/templates/dashboard';

export default function CreditScore() {
  return (
    <>
      <HeadContainer title="My Credit Score" ogImage="default" />
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
        <CreditScoreTemplate />
      </DashboardTemplate>
    </>
  );
}
