import {
  CardActionArea,
  CardHeader,
  Box,
  Divider,
  Button,
} from '@mui/material';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

type InfoCardProps = {
  image: string;
  slug: string;
  href: string;
  description: string;
  title: string;
  options: string[];
  backgroundColor: string;
  disabled: boolean;
};

export function InfoCard({
  title,
  image,
  description,
  slug,
  options,
  href,
  backgroundColor,
  disabled,
}: InfoCardProps): JSX.Element {
  const contentChildren = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <CardHeader
          sx={{
            background: backgroundColor,
            width: '56px',
            height: '56px',
            borderRadius: '64px',
            ml: 1,
            px: 1.4,
          }}
          avatar={
            <Image src={image} alt={title} width={'32px'} height={'32px'} />
          }
        />
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontSize: '20px',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: '16px',
            }}
          >
            {description}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: '16px',
              mb: '32px',
              fontSize: '16px',
            }}
          >
            {slug}
          </Typography>
          {options.map((option) => (
            <>
              <Typography
                color="text.secondary"
                sx={{
                  my: '9px',
                  fontSize: '16px',
                }}
              >
                {option}
              </Typography>
              <Divider />
            </>
          ))}
          <Button
            variant="contained"
            disabled={disabled}
            fullWidth
            sx={{ height: 48, mt: 10 }}
          >
            {disabled ? 'Coming Soon' : 'Create'}
          </Button>
        </CardContent>
      </Box>
    </>
  );

  return (
    <>
      {
        <MUICard
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            padding: '32px',
            width: '450px',
          }}
        >
          {contentChildren}
        </MUICard>
      }
    </>
  );
}
