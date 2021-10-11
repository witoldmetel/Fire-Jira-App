import { makeStyles } from '@mui/styles';
import { Box, Theme } from '@mui/material';

import { Page } from 'src/core/components';

export default function LandingPage() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Fire Jira">
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at
        its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
        opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing
        packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'
        will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </Box>
    </Page>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
  }
}));
