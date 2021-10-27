import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

import { Box, Container, Typography, Theme, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

export function MainFooter() {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Container maxWidth="lg">
        <motion.div animate={{ y: [-25, 0, -25] }} transition={{ duration: 5, repeat: Infinity }}>
          <Link to="move_top" spy smooth>
            <Tooltip title="Let's go!" placement="top">
              <Box className={classes.rocketLogo} component="img" src="/static/rocket.svg" />
            </Tooltip>
          </Link>
        </motion.div>

        <Typography variant="caption" component="p">
          Copyright © witoldmetel
        </Typography>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: '40px 0',
    textAlign: 'center',
    position: 'relative',
    backgroundColor: theme.palette.background.default
  },
  rocketLogo: {
    marginBottom: theme.spacing(1),
    marginLeft: 'auto',
    marginRight: 'auto',
    cursor: 'pointer',
    width: 40,
    height: 40
  }
}));
