import { Button, CardActions, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface CredentialCardProps {
  name: string;
  description: string;
  smaller?: boolean;
  claimable?: boolean;
  to_complete?: boolean;
  pending?: boolean;
  mintable?: boolean;
  isNFT?: boolean;
  view?: () => void;
  claim?: () => void;
  complete?: () => void;
  mint?: () => void;
}

export default function CredentialCard({
  name,
  description,
  smaller,
  claimable,
  to_complete,
  pending,
  mintable,
  isNFT,
  view,
  claim,
  complete,
  mint,
}: CredentialCardProps) {
  return (
    <Card sx={{ maxWidth: smaller ? '250px' : '345px' }}>
      <CardMedia
        component="img"
        image="https://i.postimg.cc/6QJDW2r1/olympus-credential-picture.png"
        alt="credential image"
        sx={{ cursor: 'pointer' }}
        onClick={view}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          fontSize={20}
          sx={{ cursor: 'pointer' }}
          onClick={view}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
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
        {isNFT && <Chip label="NFT" />}
      </CardContent>
      <CardActions>
        {claimable && (
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={() => claim()}
          >
            Complete Credential
          </Button>
        )}
        {to_complete && (
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={() => complete()}
          >
            Complete Credential
          </Button>
        )}
        {mintable && (
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={() => mint()}
          >
            Mint free NFT
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
