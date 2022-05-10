/* TODO: Fix this file reference on storybook config */
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

const followingDaos: DashboardTemplateProps['followingDaos'] = [
  { id: 1, name: 'Bankless Dao' },
  { id: 2, name: 'Dao 2' },
];

export const Primary = Template.bind({});
Primary.args = {
  followingDaos,
} as DashboardTemplateProps;
