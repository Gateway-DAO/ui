import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Chip, Stack } from '@mui/material';
import { TokenFilled } from '@gateway/assets';
import { Subjects } from './index';

export const DefaultMintScreen = ({
  mintProcessStatus,
  setmintProcessStatus,
}) => {
  return (
    <>
      <CardMedia
        component="img"
        height="275"
        image="https://f8n-production-collection-assets.imgix.net/0x5F4b303d4083E6dF6A516a338b2b2B40D2e65C3e/1/nft.jpg?q=80&auto=format%2Ccompress&cs=srgb&h=640"
        alt="nft image"
      />
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Olympus Odyssey"
      />
      <CardContent sx={{ mt: -2.0 }}>
        <Typography variant="body2" color="text.secondary">
          This is the beginning of your journey in OlympusDAO. Learn about
          what...
        </Typography>
      </CardContent>
      <Stack direction="row" spacing={1} px={2} pt={1} pb={2}>
        {mintProcessStatus === Subjects.default ? (
          <Chip
            key={'mint button'}
            label={'MINT AS NFT'}
            size="medium"
            color="primary"
            icon={<TokenFilled height={20} width={20} color="action" />}
            onClick={() => setmintProcessStatus(Subjects.start)}
          />
        ) : (
          <Avatar sx={{ height: 32, width: 32 }}>
            <TokenFilled height={24} width={24} color="action" />
          </Avatar>
        )}
        {/* we can show maximum 2 categories , when mintProcessStauts is minted*/}
        <Chip key={'onboarding'} label={'Onbarding'} size="medium" />
        <Chip key={'more'} label={'+1'} size="medium" />
      </Stack>
    </>
  );
};
