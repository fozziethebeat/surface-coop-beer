import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Card  from '../components/Card';

export default {
  title: 'base/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} >{args.label}</Card>;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Some Content',
};
