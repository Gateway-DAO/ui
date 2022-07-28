import { useRouter } from 'next/router';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Toolbar, Button, Avatar, IconButton } from '@mui/material';

import { LoadingButton } from '../../atoms/loading-button';

type Props = {
  isLoading: boolean;
};

export const CreateNavbar = ({ isLoading }: Props) => {
  const router = useRouter();
  return (
    <>
      <AppBar position="fixed" sx={{ background: 'none', padding: '0 90px' }}>
        <Toolbar>
          <IconButton
            sx={{ position: 'absolute', left: 0 }}
            onClick={() => router.back()}
          >
            <Avatar>
              <ArrowBackIcon />
            </Avatar>
          </IconButton>
          <LoadingButton
            type="submit"
            form="gate-details-form"
            variant="contained"
            size="large"
            sx={{ position: 'absolute', right: 0 }}
            isLoading={isLoading}
          >
            Publish Gate
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
