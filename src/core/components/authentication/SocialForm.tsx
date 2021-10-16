import { Typography, Button, Divider, Grid } from '@mui/material';
import { Facebook, Google } from '@mui/icons-material';

export function SocialForm() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            // onClick={handleLoginGoogle}
          >
            <Google style={{ color: '#DF3E30' }} height={24} />
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            // onClick={handleLoginFaceBook}
          >
            <Facebook style={{ color: '#1877F2' }} height={24} />
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
