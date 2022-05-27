import { Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function CredentialCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="302"
        image="https://i.postimg.cc/6QJDW2r1/olympus-credential-picture.png"
        alt="credential image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontSize={20}>
          Olympus Operations Work...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The Operations Group at Olympus is responsible for making sure that
          work...
        </Typography>
      </CardContent>
      <CardActions>
        <Chip label="Operations" />
        <Chip label="Contributor" />
      </CardActions>
    </Card>
  );
}
