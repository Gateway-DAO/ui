import { DiscordIcon } from 'apps/website/components/atoms/icon';
import { TOKENS } from 'apps/website/theme';

import { Box, Button, Stack, Typography } from '@mui/material';

import { ScheduleDemoImage } from './styles';
import { ScheduleDemoProps } from './types';

export function ScheduleDemo({
  title,
  scheduleButton,
  joinDiscord,
}: ScheduleDemoProps): JSX.Element {
  return (
    <Box
      component="section"
      sx={() => ({
        my: '20px',
        width: '100%',
      })}
    >
      <Box
        sx={(theme) => ({
          border: '1px solid rgba(229, 229, 229, 0.12)',
          p: '48px',
          borderRadius: '24px',
          position: 'relative',
          overflow: 'hidden',
          [theme.breakpoints.down('sm')]: {
            p: '24px',
          },
        })}
      >
        <ScheduleDemoImage
          src="/images/schedule-demo-background.png"
          layout={'fill'}
          objectFit={'cover'}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={(theme) => ({
              pb: '24px',
              maxWidth: '316px',
              mb: '40px',
              [theme.breakpoints.down('sm')]: {
                ...theme.typography.h6,
                maxWidth: '199px',
              },
            })}
          >
            {title}
          </Typography>
          <Stack
            direction="row"
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
            })}
          >
            <a
              href="https://blb4ytkp5bp.typeform.com/to/LdwGpBLK"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="contained"
                size="large"
                sx={(theme) => ({
                  height: '42px',
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  mr: '10px',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                  [theme.breakpoints.down('sm')]: {
                    width: '100%',
                    mr: 0,
                    mb: '8px',
                  },
                })}
              >
                {scheduleButton}
              </Button>
            </a>
            <a
              href="https://discord.gg/3fFFFk5dBN"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="outlined"
                size="large"
                startIcon={<DiscordIcon />}
                sx={(theme) => ({
                  height: '42px',
                  borderColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.main,
                  '&:visited, &:hover': {
                    borderColor: theme.palette.secondary.main,
                    backgroundColor: theme.palette.secondary,
                  },
                  [theme.breakpoints.down('sm')]: {
                    width: '100%',
                  },
                })}
              >
                {joinDiscord}
              </Button>
            </a>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
