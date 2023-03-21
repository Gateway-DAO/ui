import { theme } from '@gateway/theme';
import { ThemeProvider } from '@gateway/theme-react';

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
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story, { parameters }) => {
    return (
      <ThemeProvider withGlobalStyles={parameters?.layout === 'fullscreen'}>
        <Story />
      </ThemeProvider>
    );
  },
];
