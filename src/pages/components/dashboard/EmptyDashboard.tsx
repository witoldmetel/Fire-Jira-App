import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { bounceIn, MotionContainer } from 'src/core/components';
import { PATH_DASHBOARD } from 'src/routes/paths';

export function EmptyDashboard() {
  return (
    <MotionContainer initial="initial" open>
      <Box className="max-w-850 m-auto text-center p-16 border-2 border-dashed border-grey-400">
        <motion.div variants={bounceIn}>
          <Typography variant="h3" paragraph>
            You aren&apos;t part of any project
          </Typography>
        </motion.div>
        <Typography className="text-text-secondary">
          Create a new one or wait for an invite from another project
        </Typography>

        <motion.div variants={bounceIn}>
          <Box sx={{ width: 300, height: 300 }} component="img" src="/static/alert.svg" />
        </motion.div>

        <Button component={Link} to={PATH_DASHBOARD.newProject} size="large" variant="contained">
          Create new project
        </Button>
      </Box>
    </MotionContainer>
  );
}
