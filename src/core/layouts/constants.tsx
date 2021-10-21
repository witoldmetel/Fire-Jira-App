import { Box } from '@mui/material';
import { Help, VpnKey, ContactPage, EmojiPeople } from '@mui/icons-material';

import { PATH_AUTH } from '../../routes/paths';

export const mainMenuConfig = [
  {
    title: 'About Me',
    icon: <EmojiPeople sx={{ width: 22, height: 22 }} />,
    path: ''
  },
  {
    title: 'Contact Me',
    icon: <ContactPage sx={{ width: 22, height: 22 }} />,
    path: ''
  },
  {
    title: 'FAQs',
    icon: <Help />,
    path: ''
  },
  {
    title: 'Storybook',
    icon: <Box component="img" src="/static/storybook.svg" sx={{ width: 22, height: 22 }} />,
    path: ''
  },
  {
    title: 'Register',
    icon: <VpnKey sx={{ width: 22, height: 22 }} />,
    path: PATH_AUTH.register
  }
];
