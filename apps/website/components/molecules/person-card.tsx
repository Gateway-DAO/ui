import { Avatar, Button, CardHeader } from '@mui/material';
import MUICard from '@mui/material/Card';

export function PersonCard() {
  return (
    <MUICard
      sx={{ maxWidth: (theme) => theme.spacing(51), borderRadius: 2 }}
      variant="outlined"
      elevation={1}
    >
      <CardHeader
        sx={{ '.MuiCardHeader-action': { alignSelf: 'unset' } }}
        avatar={
          <Avatar
            sx={{
              width: 40,
              height: 40,
            }}
            aria-label="recipe"
          >
            R
          </Avatar>
        }
        action={
          <Button variant="outlined" size="small" color="secondary">
            Connect
          </Button>
        }
        title="Shrimp and Chorizo"
        subheader="September 14, 2016"
      />
    </MUICard>
  );
}
