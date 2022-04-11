import { theme, ThemeProvider } from "@gateway/theme"


export const parameters = {
  backgrounds: {
    default: 'gateway',
    values: [
      {
        name: 'gateway',
        value: theme.palette.background.default,
      },
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider><Story /></ThemeProvider>
  ),
];
