import { Facebook, Google } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';

type SocialFormProps = {
  onGoogleClick: VoidFunction;
};

export function SocialForm({ onGoogleClick }: SocialFormProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <Button className="border-text-secondary" fullWidth size="large" variant="outlined" onClick={onGoogleClick}>
          <Google className="text-[#DF3E30]" height={24} />
        </Button>
      </Grid>
      <Grid item xs>
        <Button className="border-text-secondary" fullWidth size="large" variant="contained" disabled>
          <Facebook className="text-text-secondary" height={24} />
        </Button>
      </Grid>
    </Grid>
  );
}
