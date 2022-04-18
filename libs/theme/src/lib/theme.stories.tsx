import styled from '@emotion/styled';
import { Story, Meta } from '@storybook/react';
import { Component, ComponentType } from 'react';
import ReactJson, { ReactJsonViewProps } from 'react-json-view'
import { theme } from './theme';


const JsonViewer = ReactJson as unknown as ComponentType<ReactJsonViewProps>;
// React 18 peerdeps issue https://github.com/microsoft/DefinitelyTyped-tools/issues/433
const FallbackReact18JsonViewer = ReactJson as any ;

export default {
  component: JsonViewer,
  title: 'Design System/MUI/Theme',
} as Meta<ReactJsonViewProps>;

export const Template: Story<ReactJsonViewProps> = () => <FallbackReact18JsonViewer src={theme as any} collapsed  theme="monokai" style={{background: "transparent"}} />;
Template.args = {
};
