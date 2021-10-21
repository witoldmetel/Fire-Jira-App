import { useRef, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import classnames from 'classnames';

import { Link, Stack, Theme, IconButton, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';

import { MenuItemProps } from '../types';
import { MenuPopover } from 'src/core/components';

type MainMenuProps = {
  navConfig: MenuItemProps[];

  isMobile?: boolean;
};

export function MainMenu({ navConfig, isMobile }: MainMenuProps) {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (flag: boolean) => () => setOpen(flag);

  if (isMobile) {
    return (
      <>
        <IconButton
          className={classnames(classes.menuButton, { [classes.openedMenu]: open })}
          ref={anchorRef}
          onClick={handleOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <MenuPopover className={classes.menu} open={open} onClose={handleOpen(false)} anchorEl={anchorRef.current}>
          {navConfig.map((link) => (
            <MenuItem key={`${link.title}-${link.path}`} onClick={handleOpen(false)} disabled={!link.path}>
              <Link className={classes.menuItem} href={link.path} underline="none">
                {link.icon}
                {link.title}
              </Link>
            </MenuItem>
          ))}
        </MenuPopover>
      </>
    );
  }

  return (
    <Stack direction="row">
      {navConfig.map((link) => {
        return (
          <Link
            key={link.title}
            className={classes.link}
            to={link.path}
            component={RouterLink}
            end={link.path === '/'}
            underline="none"
          >
            {link.title}
          </Link>
        );
      })}
    </Stack>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    ...theme.typography.subtitle2,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(5),
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest
    }),

    '&:hover': {
      opacity: 0.5,
      textDecoration: 'none'
    }
  },
  menuButton: {
    color: theme.palette.primary.main,
    padding: 0,
    width: 45,
    height: 45
  },
  openedMenu: {
    color: theme.palette.text.primary
  },
  menu: {
    width: 250
  },
  menuItem: {
    display: 'flex',
    padding: `${theme.spacing(1)} 0`,

    '& > :first-child': {
      marginRight: 15
    }
  }
}));
