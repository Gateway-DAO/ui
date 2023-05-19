import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { TOKENS } from '@/theme';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ROUTES } from '../../../constants/routes';
import { useWindowSize } from '../../../hooks/use-window-size';
import { ClientNav } from '../../organisms/navbar/client-nav';
import { NavBarSettings } from './navbar-settings';

type Props = {
  children?: React.ReactNode;
};

export default function SettingsTemplate({ children }: Props) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation('settings');
  const windowSize = useWindowSize();

  const isMenuPage = () => {
    return router.pathname === ROUTES.SETTINGS;
  };

  return (
    <>
      <Grid
        container
        height={isMobile && !isMenuPage() ? 'auto' : '100%'}
        sx={{
          flexWrap: 'nowrap',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: `${windowSize.height}px`,
        }}
      >
        <Grid item xs={12} md={4} sx={{ pt: 2, flexGrow: 0 }}>
          <Stack
            direction="row"
            flexGrow={1}
            alignItems="center"
            justifyContent="space-between"
            gap={1}
            sx={{
              display: 'flex',
              px: TOKENS.CONTAINER_PX,
              flexGrow: {
                md: 0.5,
              },
            }}
          >
            <IconButton
              onClick={() =>
                isMobile && !isMenuPage()
                  ? router.push(ROUTES.SETTINGS)
                  : router.back()
              }
            >
              <Avatar>
                <ArrowBackIcon />
              </Avatar>
            </IconButton>
            <Box sx={{ display: { sm: 'flex', md: 'none' }, mr: 2 }}>
              <ClientNav />
            </Box>
          </Stack>
          {((isMobile && isMenuPage()) || !isMobile) && (
            <>
              <Typography
                variant="h4"
                sx={(theme) => ({
                  py: '12px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: {
                    xs: `${theme.spacing(6)} ${theme.spacing(4)}`,
                    md: `${theme.spacing(5)} ${theme.spacing(7)}`,
                  },
                })}
              >
                {t('settings-title')}
              </Typography>
              <NavBarSettings />
            </>
          )}
        </Grid>
        {!isMobile && <Divider orientation="vertical" flexItem />}
        {((isMobile && !isMenuPage()) || !isMobile) && (
          <Grid item xs={12} md sx={{ pt: 2 }}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              sx={{
                px: TOKENS.CONTAINER_PX,
                flexGrow: {
                  md: 0.5,
                },
                display: {
                  xs: 'none',
                  md: 'flex',
                },
              }}
            >
              <ClientNav />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                margin: { xs: '16px 16px 40px 16px', md: '40px 60px 60px' },
              }}
            >
              {children}
            </Stack>
          </Grid>
        )}
      </Grid>
    </>
  );
}
