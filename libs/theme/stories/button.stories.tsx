import { Story, Meta } from '@storybook/react';
import { ButtonProps } from '@mui/material/Button';
import { Button } from './button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export default {
  component: Button,
  title: 'Design System/MUI/Button',
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button',
  variant: 'outlined',
} as ButtonProps;

export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
  children: 'Button',
  variant: 'outlined',
  startIcon: <DeleteIcon />,
} as ButtonProps;

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
  children: 'Button',
  variant: 'outlined',
  endIcon: <SendIcon />,
} as ButtonProps;
