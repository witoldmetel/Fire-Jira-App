import { motion } from 'framer-motion';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AnimationWrapper } from './AnimationWrapper';
import { bounceIn } from '../core/components/animations';

export default {
  title: 'Bounce',
  component: <AnimationWrapper />,
  // Sets the layout parameter component wide.
  parameters: {
    layout: 'centered'
  }
} as unknown as ComponentMeta<typeof AnimationWrapper>;

const Template: ComponentStory<typeof AnimationWrapper> = (args) => <AnimationWrapper {...args} />;

export const Primary = Template.bind({});
