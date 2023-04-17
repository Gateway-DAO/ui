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
import { brandColors, theme } from '@gateway/theme';

export function CardCreditScore(): JSX.Element {
  const url = ROUTES.PROTOCOL_DATAMODEL.replace('[id]', 's');
  return (
    <MUICard
      sx={{
        width: '620px',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '16px',
        [theme.breakpoints.down('md')]: {
          width: '343px',
          display: 'flex',
        },
      }}
    >
      <CardContent sx={{ py: '10px', marginY: '20px' }}>
        <Typography gutterBottom variant="h5" sx={{ cursor: 'pointer' }}>
          Your new DeFi Credit
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          sx={{ cursor: 'pointer', lineHeight: '160%' }}
        >
          Score has arrived
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
          Discover your credit score now
        </Typography>
        <Button variant="outlined" sx={{ marginTop: '20px' }}>
          ISSUE NOW
        </Button>
      </CardContent>

      <Box
        sx={{
          marginTop: '40px',
          marginRight: '10px',
        }}
      >
        <img
          src={'/images/credit-score.png'}
          alt={'Credit score image'}
          width={'169.18px'}
        />
      </Box>
    </MUICard>
  );
}
