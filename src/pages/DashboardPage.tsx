import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Container, Theme, Box, Typography, Button, Card } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

import { Page, MotionContainer, bounceIn, LoadingPage } from 'src/core/components';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useDispatch, useSelector } from 'src/store/store';
import { fetchProjects } from 'src/store/slices/project/thunks/fetch-projects';
import { getProjectState } from 'src/store/slices/project';

export default function DashboardPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, projects } = useSelector(getProjectState);

  useEffect(() => {
    dispatch(fetchProjects());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <Page className={classes.root} title="Dashboard | Fire Jira">
      <div className={classes.content}>
        {/* <Container> */}
        {projects?.length ? (
          <Box className={classes.wrapper}>
            {projects.map((project) => (
              <Card key={project.id} className={classes.projectCard}>
                {project.name}
              </Card>
            ))}
          </Box>
        ) : (
          // EMPTY STATE
          <MotionContainer initial="initial" open>
            <Box className={classes.emptyState}>
              <motion.div variants={bounceIn}>
                <Typography variant="h3" paragraph>
                  You aren't part of any project
                </Typography>
              </motion.div>
              <Typography className={classes.text}>
                Create a new one or wait for an invite from another project
              </Typography>

              <motion.div variants={bounceIn}>
                <Box className={classes.image} component="img" src="/static/alert.svg" />
              </motion.div>

              <Button component={Link} to={PATH_DASHBOARD.newProject} size="large" variant="contained">
                Create new project
              </Button>
            </Box>
          </MotionContainer>
        )}
        {/* </Container> */}
      </div>
    </Page>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // height: '100%',
    zIndex: 100,
    width: '100%',
    flexGrow: 1,
    position: 'relative',
    padding: '0 4vw',
    backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 40%, ${
      theme.palette.grey[300]
    } 100%)`
  },
  content: {
    // padding: theme.spacing(14, 0)
    margin: '0 auto',
    maxWidth: 1040,
    width: '100%'
  },
  wrapper: {
    marginTop: -70,
    paddingTop: 0,
    display: 'flex',
    flexWrap: 'wrap',
    margin: ' 0 -20px',
    padding: '40px 0 0 0'
  },
  projectCard: {
    display: 'flex',
    flex: '1 1 100%',
    flexDirection: 'row',
    overflow: 'hidden',
    margin: '0 20px 40px',
    minHeight: 300,
    background: '#fff center center',
    backgroundSize: 'cover',
    borderRadius: 5,
    boxShadow: 'rgb(39 44 49 / 6%) 8px 14px 38px, rgb(39 44 49 / 3%) 1px 3px 8px',
    transition: 'all 0.5s ease',
    cursor: 'pointer',

    '&:hover': {
      boxShadow: 'rgb(39 44 49 / 7%) 8px 28px 50px, rgb(39 44 49 / 4%) 1px 6px 12px',
      transition: 'all 0.4s ease',
      transform: 'translate3D(0,-1px,0) scale(1.02)'
    }
  },
  emptyState: {
    maxWidth: 850,
    margin: 'auto',
    textAlign: 'center',
    border: `2px dashed ${theme.palette.grey[400]}`,
    padding: theme.spacing(4)
  },
  text: {
    color: theme.palette.text.secondary
  },
  image: {
    width: 300,
    height: 300
  }
}));
