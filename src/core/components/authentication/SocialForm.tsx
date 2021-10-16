import { Typography, Button, Divider, Grid } from '@mui/material';
import { Facebook, Google } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

type SocialFormProps = {
  onGoogleClick: VoidFunction;
};

export function SocialForm({ onGoogleClick }: SocialFormProps) {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs>
          <Button className={classes.button} fullWidth size="large" variant="outlined" onClick={onGoogleClick}>
            <Google className={classes.googleIcon} height={24} />
          </Button>
        </Grid>
        <Grid item xs>
          <Button className={classes.button} fullWidth size="large" variant="contained" disabled>
            <Facebook className={classes.facebookIcon} height={24} />
          </Button>
        </Grid>
      </Grid>

      <Divider className={classes.divider}>
        <Typography variant="body2">OR</Typography>
      </Divider>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderColor: theme.palette.text.secondary
  },
  googleIcon: {
    color: '#DF3E30'
  },
  facebookIcon: {
    color: theme.palette.text.secondary
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));
