import { useRef, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import classnames from 'classnames';

import { Link, Stack, Theme, IconButton, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import { MenuItemProps } from '../types';
import { MenuPopover } from 'src/core/components';

type MainMenuProps = {
  isOffset: boolean;
  navConfig: MenuItemProps[];

  isMobile?: boolean;
};

export function MainMenu({ isOffset, navConfig, isMobile }: MainMenuProps) {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (flag: boolean) => setOpen(flag);

  if (isMobile) {
    return (
      <>
        <IconButton
          className={classnames(classes.menuButton, { [classes.openedMenu]: open })}
          ref={anchorRef}
          onClick={() => handleOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <MenuPopover
          className={classes.menu}
          open={open}
          onClose={() => handleOpen(false)}
          anchorEl={anchorRef.current}
        >
          {navConfig.map((link) => (
            <Link key={`${link.title}-${link.path}`} href={link.path}>
              <MenuItem
                key={link.title}
                className={classes.menuItem}
                onClick={() => handleOpen(false)}
                disabled={!link.path}
              >
                {link.icon}
                {link.title}
              </MenuItem>
            </Link>
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
            sx={{
              color: 'common.white',
              ...(isOffset && { color: 'text.primary' }),
              '&.active': {
                color: 'primary.main'
              }
            }}
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
    color: theme.palette.text.primary,
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
    padding: 0,
    width: 45,
    height: 45
  },
  openedMenu: {
    '&:before': {
      zIndex: 1,
      content: "''",
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      position: 'absolute',
      backgroundColor: alpha(theme.palette.grey[900], 0.7)
    }
  },
  menu: {
    width: 250
  },
  user: {
    margin: '12px 0',
    padding: '0 20px'
  },
  email: {
    color: theme.palette.text.secondary
  },
  divider: {
    margin: '10px 0'
  },
  menuItem: {
    '& > :first-child': {
      marginRight: 15
    }
  },
  logout: {
    padding: 16,
    paddingTop: 12
  }
}));
