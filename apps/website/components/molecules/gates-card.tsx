import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function GatesCard() {
  return (
    <MUICard sx={{ borderRadius: 2 }} variant="outlined">
      <CardMedia
        component="img"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
        sx={{ aspectRatio: '1/1' }}
      />
      <CardHeader
        sx={{ pt: 2, pb: 1, '.MuiCardHeader-action': { alignSelf: 'unset' } }}
        avatar={
          <Avatar sx={{ width: 32, height: 32 }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton color="secondary" aria-label="settings">
            <BookmarkBorderIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo"
      />
      <CardContent sx={{ py: 1 }}>
        <Typography gutterBottom variant="h5">
          Lizard
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            webkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
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
