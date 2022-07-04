import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Toolbar, Button, Avatar, IconButton } from '@mui/material';

export const CreateNavbar = ({ publish }) => {
  return (
    <>
      <AppBar position="fixed" sx={{ background: 'none', padding: '0 90px' }}>
        <Toolbar>
          <IconButton sx={{ position: 'absolute', left: 0 }}>
            <Avatar>
              <ArrowBackIcon />
            </Avatar>
          </IconButton>
          <Button
            variant="contained"
            size="large"
            sx={{ position: 'absolute', right: 0 }}
            onClick={() => publish()}
          >
            Publish Gate
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
