import { AddOrganizationIcon } from '@/components/atoms/icons/add-organization-icon';
import { useCreateOrgCardProps } from '@/hooks/use-create-org-card-props';
import { brandColors } from '@/theme';

import { Button, Stack, Typography, alpha } from '@mui/material';

type Props = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonAction: () => void;
};

export function CreateOrgCardDashboard({
  title,
  description,
  buttonLabel,
  buttonAction,
}: Props) {
  const createOrgCardProps = useCreateOrgCardProps({ action: buttonAction });
  return (
    <Stack
      component="a"
      gap={3}
      justifyContent="space-between"
      sx={{
        width: '100%',
        flexDirection: 'column',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: brandColors.purple.main,
        borderRadius: 2,
        p: 6,
        mb: 9,
        textAlign: 'left',
        cursor: 'pointer',
        position: 'relative',
        textDecoration: 'none',
        backgroundImage: "url('/images/explore/explore-banner_background.png')",
        backgroundSize: 'cover',
      }}
      {...createOrgCardProps}
    >
      <AddOrganizationIcon />
      <Stack flexGrow={1} gap={1.5} sx={{ maxWidth: 420 }}>
        <Typography variant="h2" fontSize={34} color={brandColors.white.main}>
          {title}
        </Typography>
        <Typography
          fontSize={16}
          sx={{ color: alpha(brandColors.white.main, 0.7) }}
        >
          {description}
        </Typography>
      </Stack>
      <Button
        component="span"
        variant="contained"
        sx={{ flexGrow: 0, maxWidth: { xs: 150, md: '100%' }, minWidth: 130 }}
      >
        {buttonLabel}
      </Button>
      <Stack
        sx={{
          display: { xs: 'none', md: 'block' },
          width: { md: '40%', lg: '50%' },
          maxWidth: 620,
          height: '100%',
          position: 'absolute',
          bottom: { lg: -50, md: '20%' },
          right: 0,
        }}
      >
        <Stack
          sx={{
            backgroundImage: "url('/images/create-org-dashboard-4.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: '44%',
            aspectRatio: '0.81',
            position: 'absolute',
            left: '17%',
            bottom: 25,
          }}
        />
        <Stack
          sx={{
            backgroundImage: "url('/images/create-org-dashboard-3.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: '36%',
            aspectRatio: '0.81',
            position: 'absolute',
            left: '20%',
            bottom: 0,
          }}
        />
        <Stack
          sx={{
            backgroundImage: "url('/images/create-org-dashboard-2.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: '36%',
            aspectRatio: '0.81',
            position: 'absolute',
            left: '57%',
            bottom: 0,
          }}
        />
        <Stack
          sx={{
            backgroundImage: "url('/images/create-org-dashboard-1.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: '28%',
            aspectRatio: '2.57',
            position: 'absolute',
            left: 0,
            bottom: { md: '20%', lg: '40%' },
          }}
        />
      </Stack>
    </Stack>
  );
}
