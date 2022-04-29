import { Story, Meta } from '@storybook/react';

import { TypographyProps } from '@mui/material/Typography';

import { Typography } from './typography';

export default {
  component: Typography,
  title: 'Design System/MUI/Typography',
} as Meta;

export const AllVariants = () => (
  <>
    <Typography variant="body1">Body1</Typography>
    <Typography variant="body2">Body2</Typography>
    <Typography variant="subtitle1">Subtitle1</Typography>
    <Typography variant="subtitle2">Subtitle2</Typography>
    <Typography variant="caption">Caption</Typography>
    <Typography variant="overline">Overline</Typography>
    <Typography variant="h1">H1</Typography>
    <Typography variant="h2">H2</Typography>
    <Typography variant="h3">H3</Typography>
    <Typography variant="h4">H4</Typography>
    <Typography variant="h5">H5</Typography>
    <Typography variant="h6">H6</Typography>
  </>
);

const Template: Story<TypographyProps> = (args) => <Typography {...args} />;

export const Body1 = Template.bind({});
Body1.args = {
  children: 'Body1',
  variant: 'body1',
};
export const Body2 = Template.bind({});
Body2.args = {
  children: 'Body2',
  variant: 'body2',
};
export const Subtitle1 = Template.bind({});
Subtitle1.args = {
  children: 'Subtitle1',
  variant: 'subtitle1',
};
export const Subtitle2 = Template.bind({});
Subtitle2.args = {
  children: 'Subtitle2',
  variant: 'subtitle2',
};
export const Caption = Template.bind({});
Caption.args = {
  children: 'Caption',
  variant: 'caption',
};
export const Overline = Template.bind({});
Overline.args = {
  children: 'Overline',
  variant: 'overline',
};
export const H1 = Template.bind({});
H1.args = {
  children: 'H1',
  variant: 'h1',
};
export const H2 = Template.bind({});
H2.args = {
  children: 'H2',
  variant: 'h2',
};
export const H3 = Template.bind({});
H3.args = {
  children: 'H3',
  variant: 'h3',
};
export const H4 = Template.bind({});
H4.args = {
  children: 'H4',
  variant: 'h4',
};
export const H5 = Template.bind({});
H5.args = {
  children: 'H5',
  variant: 'h5',
};
export const H6 = Template.bind({});
H6.args = {
  children: 'H6',
  variant: 'h6',
};
