import AcUnitIcon from '@mui/icons-material/AcUnit';

import { PATH_PAGE } from '../../routes/paths';

export const mainMenuConfig = [
  {
    title: 'Home',
    icon: <AcUnitIcon sx={{ width: 22, height: 22 }} />,
    path: '/'
  },
  {
    title: 'Components',
    icon: <AcUnitIcon sx={{ width: 22, height: 22 }} />,
    path: PATH_PAGE.about
  },

  {
    title: 'Documentation',
    icon: <AcUnitIcon sx={{ width: 22, height: 22 }} />,
    path: PATH_PAGE.about
  }
];
