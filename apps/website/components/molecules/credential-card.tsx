import { Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface CredentialCardProps {
  smaller?: boolean;
  pending?: boolean;
}

export default function CredentialCard({
  smaller,
  pending,
}: CredentialCardProps) {
  return (
    <Card sx={{ maxWidth: smaller ? '250px' : '345px' }}>
      <CardMedia
        component="img"
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
      <CardContent
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
          padding: '0 10px',
        }}
      >
        <Chip label="Operations" />
        <Chip label="Contributor" />
        {pending && (
          <Chip
            label="Pending Approval"
            variant="outlined"
            sx={{ color: 'red', borderColor: 'red' }}
          />
        )}
      </CardContent>
    </Card>
  );
}
