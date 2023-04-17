import {
  Avatar,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  Box,
  CardActions,
  Button,
} from '@mui/material';
import MUICard from '@mui/material/Card';
import { ROUTES } from 'apps/website/constants/routes';

export function CardEarnCredential(): JSX.Element {
  const url = ROUTES.PROTOCOL_DATAMODEL.replace('[id]', 's');
  return (
    <MUICard
      sx={{
        width: '620px',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '16px',
      }}
    >
      <CardContent sx={{ py: '10px', marginY: '20px' }}>
        <Typography gutterBottom variant="h5" sx={{ cursor: 'pointer' }}>
          Earn credentials
        </Typography>

        <Typography
          height={40}
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: '166%',
          }}
        >
         Execute tasks and earn credentials
        </Typography>
        <Button variant="outlined" sx={{ marginTop: '95px' }}>
          START NOW
        </Button>
      </CardContent>

      <Box
        sx={{
          marginTop: '20px',
          marginRight: '10px',
        }}
      >
        <img
          src={'/images/earn-credentials.png'}
          alt={'Credit score image'}
          width={'310px'}
        />
      </Box>
    </MUICard>
  );
}
