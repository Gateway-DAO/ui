import { useTheme } from '@mui/material';
import MUIGlobalStyles from '@mui/material/GlobalStyles';

export const GlobalStyles = () => {
  const theme = useTheme();

  return (
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
        'input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active':
          {
            '-webkit-box-shadow': `0 0 0 30px ${theme.palette.background.light} inset !important`,
          },
      }}
    />
  );
};
