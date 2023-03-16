import useTranslation from 'next-translate/useTranslation';

import { brandColors, TOKENS } from '@gateway/theme';

import { alpha, Box, Stack, Typography } from '@mui/material';

import { useAuth } from '../../../../providers/auth';
import { ExperienceAccordion } from './experience';

export function Earned() {
  const { me } = useAuth();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: 6,
        ...(me.experiences?.length == 0 && {
          borderBottom: 1,
          borderColor: 'divider',
        }),
        display: 'flex',
        flexDirection: 'column',
        rowGap: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          px: TOKENS.CONTAINER_PX,
          justifyContent: 'space-between',
        }}
      >
        <Typography style={{ color: '#fff', fontSize: '20px' }} variant="h2">
          {t('common:tabs.credentials')}
        </Typography>
      </Box>
      {me.experiences?.length > 0 ? (
        <Stack>
          {me.experiences.map((experience, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                py: 2,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <ExperienceAccordion {...{ experience, index }} />
            </Box>
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            px: TOKENS.CONTAINER_PX,
          }}
        >
          <Typography
            style={{
              fontSize: '16px',
              fontWeight: '400',
              color: alpha(brandColors.white.main, 0.7),
            }}
            variant="h6"
          >
            {t('common:count.credential.0')}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
