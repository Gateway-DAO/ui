import { Story, Meta } from '@storybook/react';

import { DashboardTemplate, DashboardTemplateProps } from './dashboard';

export default {
  component: DashboardTemplate,
  title: 'Templates/Dashboard Template',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<DashboardTemplateProps> = (args) => (
  <DashboardTemplate {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
