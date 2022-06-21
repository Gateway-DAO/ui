import { useState } from 'react';

import { Button, CardActions, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface CredentialCardProps {
  smaller?: boolean;
  uncomplete?: boolean;
  pending?: boolean;
  mintable?: boolean;
  isNFT?: boolean;
  earn?: () => void;
  mint?: () => void;
}

export default function CredentialCard({
  smaller,
  uncomplete,
  pending,
  mintable,
  isNFT,
  earn,
  mint,
}: CredentialCardProps) {
  const [isMinting, setMinting] = useState<boolean>(false);

  const handleMint = async () => {
    setMinting(true);
    await mint();
    setMinting(false);
  };

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
        {isNFT && <Chip label="NFT" />}
      </CardContent>
      <CardActions>
        {uncomplete && (
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={() => earn()}
          >
            Complete credential
          </Button>
        )}
        {mintable && (
          <Button
            startIcon={<i className="fas fa-coins" />}
            variant="contained"
            sx={{ width: '100%' }}
            onClick={() => handleMint()}
          >
            {isMinting ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              'Claim it as an NFT'
            )}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
