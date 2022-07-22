import MUIGlobalStyles from '@mui/material/GlobalStyles';

export const GlobalStyles = () => (
  <MUIGlobalStyles
    styles={{
      'html, body': {
        height: '100%',
        scrollBehavior: 'smooth',
      },
      body: {
        padding: 0,
        transition: 'background-color 0.3s ease-in-out',
      },
    }}
  />
);
