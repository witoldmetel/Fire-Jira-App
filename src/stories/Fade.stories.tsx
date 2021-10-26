import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AnimationWrapper } from './AnimationWrapper';
import {
  fadeIn,
  fadeInUp,
  fadeInLeft,
  fadeInDown,
  fadeInRight,
  fadeOut,
  fadeOutUp,
  fadeOutDown,
  fadeOutLeft,
  fadeOutRight
} from '../core/components/animations/';

export default {
  title: 'Fire Jira/Animations/Fade',
  component: <AnimationWrapper />,
  // Sets the layout parameter component wide.
  parameters: {
    layout: 'centered'
  }
} as unknown as ComponentMeta<typeof AnimationWrapper>;

const Template: ComponentStory<typeof AnimationWrapper> = (args) => <AnimationWrapper {...args} />;

export const FadeIn = Template.bind({});
FadeIn.args = {
  whileHover: { ...fadeIn.animate, opacity: 0, transition: { duration: 2, repeat: Infinity } }
};

export const FadeInUp = Template.bind({});
FadeInUp.args = {
  whileHover: { ...fadeInUp.animate, opacity: 0, transition: { duration: 2, repeat: Infinity } }
};

export const FadeInLeft = Template.bind({});
FadeInLeft.args = {
  whileHover: { ...fadeInLeft.animate, opacity: 0, transition: { duration: 2, repeat: Infinity } }
};

export const FadeInDown = Template.bind({});
FadeInDown.args = {
  whileHover: { ...fadeInDown.animate, opacity: 0, transition: { duration: 2, repeat: Infinity } }
};

export const FadeInRight = Template.bind({});
FadeInRight.args = {
  whileHover: { ...fadeInRight.animate, opacity: 0, transition: { duration: 2, repeat: Infinity } }
};

export const FadeOut = Template.bind({});
FadeOut.args = {
  whileHover: { ...fadeOut.animate, opacity: 0, transition: { duration: 2, repeat: Infinity } }
};

export const FadeOutUp = Template.bind({});
FadeOutUp.args = {
  whileHover: { ...fadeOutUp.animate, opacity: 0, transition: { duration: 2, repeat: Infinity } }
};

export const FadeOutDown = Template.bind({});
FadeOutDown.args = {
  whileHover: { ...fadeOutDown.animate, opacity: 0, transition: { duration: 2, repeat: Infinity } }
};

export const FadeOutLeft = Template.bind({});
FadeOutLeft.args = {
  whileHover: { ...fadeOutLeft.animate, opacity: 0, transition: { duration: 2, repeat: Infinity } }
};

export const FadeOutRight = Template.bind({});
FadeOutRight.args = {
  whileHover: { ...fadeOutRight.animate, opacity: 0, transition: { duration: 2, repeat: Infinity } }
};
