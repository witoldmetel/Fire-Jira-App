import { Link } from 'react-router-dom';
import { Box, Button, Container, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import { bounceIn, MotionContainer, Page } from 'src/core/components';

export default function UnknownPage() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="404 Page Not Found | Fire Jira">
      <Container>
        <MotionContainer initial="initial" open>
          <Box className={classes.box}>
            <motion.div variants={bounceIn}>
              <Typography variant="h3" paragraph>
                Sorry, page not found!
              </Typography>
            </motion.div>
            <Typography className={classes.text}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check
              your spelling.
            </Typography>

            <motion.div variants={bounceIn}>
              <Box className={classes.image} component="img" src={'/static/404.png'} />
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10),
  },
  box: {
    maxWidth: 480,
    margin: 'auto',
    textAlign: 'center',
  },
  text: {
    color: theme.palette.text.secondary,
  },
  image: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));
