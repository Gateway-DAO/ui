import { useRouter } from 'next/router';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Toolbar, Avatar, IconButton, Box } from '@mui/material';

import { LoadingButton } from '../../atoms/loading-button';

type Props = {
  isLoading: boolean;
};

export const PublishNavbar = ({ isLoading }: Props) => {
  const router = useRouter();
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: 'none',
          padding: { xs: '0 20px 0 10px', md: '0 90px' },
        }}
      >
        <Toolbar>
          <IconButton
            sx={{ position: 'absolute', left: 0 }}
            onClick={() => router.back()}
          >
            <Avatar>
              <ArrowBackIcon />
            </Avatar>
          </IconButton>
          <Box sx={{ position: 'absolute', right: 0 }}>
            <LoadingButton
              type="submit"
              form="gate-details-form"
              variant="outlined"
              size="large"
              isLoading={isLoading}
            >
              Save as Draft
            </LoadingButton>
            <LoadingButton
              type="submit"
              form="gate-details-form"
              variant="contained"
              size="large"
              sx={{ marginLeft: 2 }}
              isLoading={isLoading}
            >
              Publish Gate
            </LoadingButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
