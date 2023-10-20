import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { bounceIn, MotionContainer, Page } from 'src/core/components';

export default function UnknownPage() {
  return (
    <Page className="flex min-h-screen items-center pt-60 pb-40" title="404 Page Not Found | Fire Jira">
      <Container>
        <MotionContainer initial="initial" open>
          <Box className="max-w-480 mx-auto text-center">
            <motion.div variants={bounceIn}>
              <Typography variant="h3" paragraph>
                Sorry, page not found!
              </Typography>
            </motion.div>
            <Typography className="text-text-secondary">
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check
              your spelling.
            </Typography>

            <motion.div variants={bounceIn}>
              <Box className="my-4" component="img" src={'/static/404.png'} />
            </motion.div>

            <Button component={Link} to="/" size="large" variant="contained">
              Go to Home
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </Page>
  );
}
