import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import { ROUTES } from '@/constants/routes';
import { Button } from '@mui/material';

export default function Error404() {
  const { t } = useTranslation('404');
  return (
    <Box
      sx={{
        display: 'flex',
        margin: { md: 'auto' },
        marginTop: { xs: 6 },
      }}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          margin: 2,
          [theme.breakpoints.up('md')]: {
            boxSizing: 'border-box',
            padding: theme.spacing(6),
            border: 1,
            borderRadius: theme.spacing(3),
            borderColor: theme.palette.divider,
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 8,
            alignItems: 'center',
          }}
        >
          <Avatar alt="Gateway" src="/logo.png" />
          <Typography variant="subtitle1" color={'#FFFFFF'} marginLeft={1}>
            {t('logo.title')}
          </Typography>
        </Box>
        <Image src="/404.png" width="469px" height="161px" />
        <Typography variant="h4" marginTop={3}>
          {t('title')}
        </Typography>
        <Typography variant="body1" marginTop={2} marginRight={10}>
          {t('message')}
        </Typography>
        <Box marginTop={6}>
          <Link href={ROUTES.EXPLORE} passHref>
            <Button component="a" variant="outlined">
              {t('home-button')}
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
