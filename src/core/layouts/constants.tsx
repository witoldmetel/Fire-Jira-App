import { ContactPage, EmojiPeople, VpnKey } from '@mui/icons-material';
import { Box } from '@mui/material';

import { PATH_AUTH, PATH_PAGE } from '../../routes/paths';

export const mainMenuConfig = [
  {
    title: 'About Me',
    icon: <EmojiPeople sx={{ width: 22, height: 22 }} />,
    path: PATH_PAGE.about,
  },
  {
    title: 'Contact Me',
    icon: <ContactPage sx={{ width: 22, height: 22 }} />,
    path: PATH_PAGE.contact,
  },
  {
    title: 'Storybook',
    icon: <Box component="img" src="/static/storybook.svg" sx={{ width: 22, height: 22 }} />,
    path: 'https://firejira-storybook.netlify.app/',
    isExternal: true,
  },
  {
    title: 'Register',
    icon: <VpnKey sx={{ width: 22, height: 22 }} />,
    path: PATH_AUTH.register,
  },
];
