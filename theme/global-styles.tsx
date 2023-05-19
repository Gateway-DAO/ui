import { useTheme } from '@mui/material';
import MUIGlobalStyles from '@mui/material/GlobalStyles';

import '@fontsource/plus-jakarta-sans';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';

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
            WebkitBoxShadow: `0 0 0 30px ${theme.palette.background.light} inset !important`,
          },
      }}
    />
  );
};
