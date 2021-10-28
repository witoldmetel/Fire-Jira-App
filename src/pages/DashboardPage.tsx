import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Container, Theme, Box, Typography, Button } from '@mui/material';
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
        <Container>
          {projects?.length ? (
            <div>{projects[0].name}</div>
          ) : (
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
        </Container>
      </div>
    </Page>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%'
  },
  content: {
    padding: theme.spacing(14, 0),
    backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 40%, ${
      theme.palette.grey[300]
    } 100%)`
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
