import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AnimationWrapper } from './AnimationWrapper';
import {
  bounceOut,
  bounceOutUp,
  bounceOutDown,
  bounceOutLeft,
  bounceOutRight,
  bounceIn,
  bounceInUp,
  bounceInDown,
  bounceInLeft,
  bounceInRight
} from '../core/components/animations/';

export default {
  title: 'Fire Jira/Animations/Bounce',
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

export const BounceOutDown = Template.bind({});
BounceOutDown.args = {
  whileHover: { ...bounceOutDown.animate, transition: { duration: 2, repeat: Infinity } }
};

export const BounceOutLeft = Template.bind({});
BounceOutLeft.args = {
  whileHover: { ...bounceOutLeft.animate, transition: { duration: 2, repeat: Infinity } }
};

export const BounceOutRight = Template.bind({});
BounceOutRight.args = {
  whileHover: { ...bounceOutRight.animate, transition: { duration: 2, repeat: Infinity } }
};

export const BounceIn = Template.bind({});
BounceIn.args = {
  whileHover: { ...bounceIn.animate, transition: { duration: 2, repeat: Infinity } }
};

export const BounceInUp = Template.bind({});
BounceInUp.args = {
  whileHover: { ...bounceInUp.animate, transition: { duration: 2, repeat: Infinity } }
};

export const BounceInDown = Template.bind({});
BounceInDown.args = {
  whileHover: { ...bounceInDown.animate, transition: { duration: 2, repeat: Infinity } }
};

export const BounceInLeft = Template.bind({});
BounceInLeft.args = {
  whileHover: { ...bounceInLeft.animate, transition: { duration: 2, repeat: Infinity } }
};

export const BounceInRight = Template.bind({});
BounceInRight.args = {
  whileHover: { ...bounceInRight.animate, transition: { duration: 2, repeat: Infinity } }
};
