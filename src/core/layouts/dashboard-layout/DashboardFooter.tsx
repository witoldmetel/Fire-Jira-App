import { Box, Container, Typography, Theme, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';

export function DashboardFooter() {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Typography variant="caption" component="p">
            witoldmetel © 2021 | Fire Jira
          </Typography>

          <Typography variant="caption" component="p">
            witoldmetel © 2021 | Fire Jira
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: '0 4vw',
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 60,
    color: '#fff',
    background: '#000'
  }
}));
