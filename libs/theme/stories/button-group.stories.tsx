import { Story, Meta } from '@storybook/react';
import { ButtonGroup } from './button-group';
import { ButtonGroupProps } from "@mui/material/ButtonGroup"

export default {
  component: ButtonGroup,
  title: 'Design System/MUI/Button Group',
} as Meta;

const Template: Story<ButtonGroupProps> = (args) => <ButtonGroup {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'outlined',
} as ButtonGroupProps;
