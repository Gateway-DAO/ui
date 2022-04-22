import MUIGlobalStyles from '@mui/material/GlobalStyles';

export const GlobalStyles = (container: string) => <MUIGlobalStyles styles={{
  [`html, body, #${container}`]: {
    height: "100%",
  },
  body: {
    padding: 0,
  }
}} />
