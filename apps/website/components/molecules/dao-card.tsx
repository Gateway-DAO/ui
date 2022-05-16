import { Avatar, Button, CardHeader } from '@mui/material';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

export function DaoCard() {
  return (
    <MUICard>
      <CardMedia
        component="img"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
        height={128}
      />
      <Box sx={{ position: 'relative', ml: 2 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            position: 'absolute',
            transform: 'translateY(-50%)',
            border: '2px solid',
            borderColor: (theme) => theme.palette.background.default, // todo: change to elevation1
          }}
          aria-label="recipe"
        >
          R
        </Avatar>
      </Box>
      <CardHeader
        sx={{ pt: 4, pb: 1, '.MuiCardHeader-action': { alignSelf: 'unset' } }}
        action={
          <Button variant="outlined" size="small" color="secondary">
            Follow
          </Button>
        }
        title="Shrimp and Chorizo"
        titleTypographyProps={{ variant: 'h6' }}
        subheader="September 14, 2016"
        subheaderTypographyProps={{ variant: 'body2' }}
      />
      <CardContent sx={{ py: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <Stack direction="row" spacing={1} px={2} pt={1} pb={2}>
        <Chip label="Onboarding" size="small" />
        <Chip label="Beginner" size="small" />
      </Stack>
    </MUICard>
  );
}
