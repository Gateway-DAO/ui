import { useState } from 'react';

import ExploreIcon from '@mui/icons-material/Explore';
import { Grid, Stack, Typography, Divider, Box, Card } from '@mui/material';

export function Experiences() {
  const [visible, setVisible] = useState(true);

  const visiblityHandler = (e) => {
    e.stopPropagation();
    setVisible(!visible);
  };

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="flex-start"
      gap={6}
    >
      {/* TimeZone */}
      <Grid
        container
        direction={{ xs: 'column', md: 'row' }}
        sx={{ rowGap: '15px', marginTop: '24px', alignItems: 'flex-start' }}
      >
        <Grid item xs={4}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: '#fff' }}
            ml={{ xs: '0px', md: '40px' }}
          >
            Experience
          </Typography>
        </Grid>
        <Grid item xs={7.5} maxWidth="100%">
          <Stack gap={2}>
            <Card
              sx={{
                width: '100%',
                height: '100px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: '24px',
                background: 'rgba(154, 83, 255, 0.08)',
                border: '1px dashed #9A53FF',
                bordeRadius: '8px',
                columnGap: '24px',
              }}
            >
              <ExploreIcon
                sx={{
                  width: '55px',
                  height: '55px',
                  background: 'rgba(229, 229, 229, 0.16)',
                  borderRadius: '64px',
                  padding: '10px',
                }}
              ></ExploreIcon>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  columnGap: '10px',
                }}
              >
                <Typography sx={{ color: '#fff' }} component="h3" variant="h6">
                  Explore Gates
                </Typography>
                <Typography
                  component="h5"
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.7)',
                    textAlign: { sx: 'left', md: 'center' },
                  }}
                  variant="h6"
                >
                  Complete an onboarding gate and start to contribute at DAO
                </Typography>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <Divider light sx={{ width: '100%' }} />
    </Stack>
  );
}
