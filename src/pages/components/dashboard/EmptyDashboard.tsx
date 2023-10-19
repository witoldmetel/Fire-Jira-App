import { Link } from 'react-router-dom';
import { Box, Button, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';

import { bounceIn, MotionContainer } from 'src/core/components';
import { PATH_DASHBOARD } from 'src/routes/paths';

export function EmptyDashboard() {
  const classes = useStyles();

  return (
    <MotionContainer initial="initial" open>
      <Box className={classes.root}>
        <motion.div variants={bounceIn}>
          <Typography variant="h3" paragraph>
            You aren&apos;t part of any project
          </Typography>
        </motion.div>
        <Typography className={classes.text}>Create a new one or wait for an invite from another project</Typography>

        <motion.div variants={bounceIn}>
          <Box className={classes.image} component="img" src="/static/alert.svg" />
        </motion.div>

        <Button component={Link} to={PATH_DASHBOARD.newProject} size="large" variant="contained">
          Create new project
        </Button>
      </Box>
    </MotionContainer>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 850,
    margin: 'auto',
    textAlign: 'center',
    border: `2px dashed ${theme.palette.grey[400]}`,
    padding: theme.spacing(4),
  },
  text: {
    color: theme.palette.text.secondary,
  },
  image: {
    width: 300,
    height: 300,
  },
}));
