import { Story, Meta } from '@storybook/react';
import { AlertProps } from '@mui/material/Alert';
import { Alert } from './alert';

export default {
  component: Alert,
  title: 'Design System/MUI/Alert',
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Alert',
  variant: 'outlined',
} as AlertProps;
