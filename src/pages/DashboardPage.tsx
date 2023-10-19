import { useEffect, useState } from 'react';
import { Box, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import classnames from 'classnames';

import { Page, Pagination } from 'src/core/components';
import { getProjectState } from 'src/store/slices/project';
import { fetchProjects } from 'src/store/slices/project/thunks/fetch-projects';
import { useDispatch, useSelector } from 'src/store/store';

import { EmptyDashboard, ProjectCard } from './components';
import { LoadingPage } from './LoadingPage';

export default function DashboardPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, projectCount, projects } = useSelector(getProjectState);
  const [page, setPage] = useState(1);

  const handleChange = (_: unknown, page: number) => {
    setPage(page);

    return dispatch(fetchProjects(page));
  };

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
      <h1 className="text-2xl font-bold underline text-theme.palette.text.secondary">Hello world!</h1>
      <div className={classes.content}>
        {projects?.length ? (
          <>
            <Box className={classes.wrapper}>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </Box>
            {projectCount && projectCount > 6 && (
              <Pagination
                className={classes.pagination}
                count={projectCount && Math.ceil(projectCount / 6)}
                page={page}
                onChange={handleChange}
                variant="outlined"
              />
            )}
          </>
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
    } 100%)`,
  },
  emptyContainer: {
    padding: '5vw',
  },
  content: {
    margin: '0 auto',
    maxWidth: 1040,
    width: '100%',
    minHeight: '60vh',
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '40px 0 0 0',
    margin: '0 - 20px',
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
      marginTop: -70,
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    padding: '25px 0',
  },
}));
