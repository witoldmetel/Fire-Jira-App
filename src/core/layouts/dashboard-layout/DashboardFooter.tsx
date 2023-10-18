import { NavLink as RouterLink } from 'react-router-dom';
import { Box, Container, Link, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { PATH_PAGE } from 'src/routes/paths';

export function DashboardFooter() {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Typography variant="caption" component="p">
            witoldmetel © 2021 | Fire Jira
          </Typography>

          <Stack direction="row">
            <Link className={classes.link} to={PATH_PAGE.about} component={RouterLink} underline="none">
              About Me
            </Link>
            <Link className={classes.link} to={PATH_PAGE.contact} component={RouterLink} underline="none">
              Contact Me
            </Link>
            <Link
              className={classes.link}
              component={Link}
              href="https://firejira-storybook.netlify.app/"
              target="_blank"
              rel="noopener"
              underline="none"
            >
              {/* color for storybook link */}
              <span style={{ color: '#FF4785' }}>Storybook</span>
            </Link>
            <Link
              className={classes.link}
              component={Link}
              href="https://github.com/witoldmetel/Fire-Jira-App"
              target="_blank"
              rel="noopener"
              underline="none"
            >
              Github
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    position: 'relative',
    padding: '0 4vw',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
    color: theme.palette.common.white,
    background: '#0a0b0c no-repeat center center',
    backgroundSize: 'cover',
    backgroundImage: 'url(/static/overlay.svg)',
  },
  link: {
    ...theme.typography.subtitle2,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
    }),

    '&:hover': {
      opacity: 0.5,
      textDecoration: 'none',
    },
  },
}));
