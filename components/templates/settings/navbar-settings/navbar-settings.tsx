import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import clsx from 'clsx';

import {
  AccountCircle,
  ManageAccounts,
  ChevronRight,
  Hub,
  Notifications,
  Code,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  ListItemButton,
  Stack,
  SvgIconTypeMap,
  Theme,
} from '@mui/material';
import { OverrideProps } from '@mui/material/OverridableComponent';
import Typography from '@mui/material/Typography';

import { ROUTES } from '@/constants/routes';

type MenuSettingsItem = {
  key: string;
  title: string;
  description: string;
  icon: EmotionJSX.Element;
  href: string;
};

export function NavBarSettings() {
  const router = useRouter();
  const { t } = useTranslation('settings');

  const iconAttr: OverrideProps<SvgIconTypeMap<any>, any> = {
    color: 'disabled',
    sx: (theme: Theme) => {
      return {
        flexGrow: 0,
        color: theme.palette.grey[400],
        mr: 3.5,
      };
    },
  };

  const menuSettings: MenuSettingsItem[] = [
    {
      key: 'settings',
      title: t('nav.public-profile-title'),
      description: t('nav.public-profile-description'),
      icon: <AccountCircle {...iconAttr} />,
      href: ROUTES.SETTINGS_PUBLIC_PROFILE,
    },
    {
      key: 'account-management',
      title: t('nav.account-management-title'),
      description: t('nav.account-management-description'),
      icon: <ManageAccounts {...iconAttr} />,
      href: ROUTES.SETTINGS_ACCOUNT_MANAGEMENT,
    },
    {
      key: 'connected-accounts',
      title: t('nav.connected-accounts-title'),
      description: t('nav.connected-accounts-description'),
      icon: <Hub {...iconAttr} />,
      href: ROUTES.SETTINGS_CONNECTED_ACCOUNTS,
    },
    {
      key: 'notifications',
      title: t('nav.notifications-title'),
      description: t('nav.notifications-description'),
      icon: <Notifications {...iconAttr} />,
      href: ROUTES.SETTINGS_NOTIFICATIONS,
    },
    {
      key: 'developer-portal',
      title: t('nav.developer-portal-title'),
      description: t('nav.developer-portal-description'),
      icon: <Code {...iconAttr} />,
      href: ROUTES.SETTINGS_DEVELOPER_PORTAL,
    },
  ];

  return (
    <>
      <Stack direction="column">
        {menuSettings.map((menuItem, i) => (
          <>
            <Link key={menuItem.key} passHref href={menuItem.href}>
              <ListItemButton
                component="a"
                key={menuItem.key}
                aria-label={`Go to ${menuItem.title}`}
                className={clsx({ active: menuItem.href === router.pathname })}
                sx={(theme) => ({
                  py: '12px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: {
                    xs: `${theme.spacing(4)} ${theme.spacing(4)}`,
                    md: `${theme.spacing(4)} ${theme.spacing(7)}`,
                  },
                  background:
                    menuItem.href === router.pathname ? '#9A53FF16' : null,
                  '&:hover': {
                    background:
                      menuItem.href === router.pathname ? '#9A53FF16' : null,
                  },
                  transition: 'all .4s ease',
                })}
              >
                {menuItem.icon}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1">{menuItem.title}</Typography>
                  <Typography
                    variant="body2"
                    sx={(theme) => ({ color: theme.palette.grey[500] })}
                  >
                    {menuItem.description}
                  </Typography>
                </Box>
                <ChevronRight
                  color="disabled"
                  sx={(theme) => ({
                    flexGrow: 0,
                    color: theme.palette.grey[400],
                  })}
                />
              </ListItemButton>
            </Link>
            {i !== menuSettings.length - 1 && <Divider />}
          </>
        ))}
      </Stack>
    </>
  );
}
