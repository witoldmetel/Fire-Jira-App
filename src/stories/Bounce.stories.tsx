import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AnimationWrapper } from './AnimationWrapper';
import { bounceIn, bounceOut, bounceOutUp } from '../core/components/animations/';

export default {
  title: 'Bounce',
  component: <AnimationWrapper />,
  // Sets the layout parameter component wide.
  parameters: {
    layout: 'centered'
  }
} as unknown as ComponentMeta<typeof AnimationWrapper>;

const Template: ComponentStory<typeof AnimationWrapper> = (args) => <AnimationWrapper {...args} />;

export const BounceOut = Template.bind({});
BounceOut.args = {
  whileHover: { ...bounceOut.animate, transition: { duration: 2, repeat: Infinity } }
};

export const BounceOutUp = Template.bind({});
BounceOutUp.args = {
  whileHover: { ...bounceOutUp.animate, transition: { duration: 2, repeat: Infinity } }
};

export const BounceIn = Template.bind({});
BounceIn.args = {
  whileHover: { ...bounceIn.animate, transition: { duration: 2, repeat: Infinity } }
};
