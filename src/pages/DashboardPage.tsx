import { useEffect } from 'react';
import classnames from 'classnames';

import { Theme, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

import { Page, LoadingPage } from 'src/core/components';
import { useDispatch, useSelector } from 'src/store/store';
import { fetchProjects } from 'src/store/slices/project/thunks/fetch-projects';
import { getProjectState } from 'src/store/slices/project';
import { EmptyDashboard, ProjectCard } from './components';

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
    <Page
      className={classnames(classes.root, { [classes.emptyContainer]: !projects?.length })}
      title="Dashboard | Fire Jira"
    >
      <div className={classes.content}>
        {projects?.length ? (
          <Box className={classes.wrapper}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Box>
        ) : (
          <EmptyDashboard />
        )}
      </div>
    </Page>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: 100,
    width: '100%',
    flexGrow: 1,
    position: 'relative',
    padding: '0 4vw',
    backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.grey[300], 0)} 40%, ${
      theme.palette.grey[300]
    } 100%)`
  },
  emptyContainer: {
    padding: '5vw'
  },
  content: {
    margin: '0 auto',
    maxWidth: 1040,
    width: '100%',
    minHeight: '60vh'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '40px 0 0 0',
    margin: '0 - 20px',
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
      marginTop: -70
    }
  }
}));
