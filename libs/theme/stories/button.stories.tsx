import { Story, Meta } from '@storybook/react';
import { ButtonProps } from '@mui/material/Button';
import { Button } from './button';

export default {
  component: Button,
  title: 'Design System/Core/Button',
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button',
  variant: 'outlined',
} as ButtonProps;
