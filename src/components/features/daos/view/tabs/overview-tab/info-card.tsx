import { theme } from '@/theme';
import { CardHeader, Box, Divider, Button, useMediaQuery } from '@mui/material';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

type InfoCardProps = {
  image: string;
  slug: string;
  description: string;
  title: string;
  options: string[];
  backgroundColor: string;
  disabled: boolean;
  action?: (nextValue?: any) => void;
};

export function InfoCard({
  title,
  image,
  description,
  slug,
  options,
  backgroundColor,
  disabled,
  action,
}: InfoCardProps): JSX.Element {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
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
            width: isMobile ? '18px' : '56px',
            height: isMobile ? '18px' : '56px',
            borderRadius: '64px',
            ml: 2,
            px: isMobile ? 2 : 1.4,
            mt: 3,
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
              mt: 2,
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
              mt: '32px',
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
            onClick={() => action(true)}
            fullWidth
            sx={{ height: 48, mt: 8 }}
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
            padding: '12px',
            width: isMobile ? '326px' : '450px',
            height: '553px',
          }}
        >
          {contentChildren}
        </MUICard>
      }
    </>
  );
}
