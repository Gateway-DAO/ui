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
  details,
}) => {
  const showCategories = () => {
    if (details.categories.length > 0) {
      if (mintProcessStatus === Subjects.default) {
        return (
          <>
            {details.categories.slice(0, 1).map((category, index) => (
              <Chip key={category} label={category} size="medium" />
            ))}
            {details.categories.length > 1 && (
              <Chip
                key={'more'}
                label={'+' + (details.categories.length - 1)}
                size="medium"
              />
            )}
          </>
        );
      }

      if (mintProcessStatus === Subjects.alreadyMinted) {
        return (
          <>
            {details.categories.slice(0, 2).map((category, index) => (
              <Chip key={category} label={category} size="medium" />
            ))}
            {details.categories.length > 2 && (
              <Chip
                key={'more'}
                label={'+' + (details.categories.length - 2)}
                size="medium"
              />
            )}
          </>
        );
      }
    }

    return null;
  };

  return (
    <>
      <CardMedia
        component="img"
        height="275"
        image={details.image}
        alt="nft image"
      />
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={details.title}
      />
      {/* TODO: fix the description overflow */}
      <CardContent sx={{ mt: -2.0 }}>
        <Typography variant="body2" color="text.secondary">
          {details.description.length > 50
            ? details.description.substring(0, 70) + '...'
            : details.description}
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
            <IconButton onClick={() => details.nft_url && window.open(details.nft_url, "_blank")}>
              <TokenFilled height={24} width={24} color="action" />
            </IconButton>
          </Avatar>
        )}
        {/* we can show maximum 2 categories , when mintProcessStauts is minted*/}
        {showCategories()}
      </Stack>
    </>
  );
};
