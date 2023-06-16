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

export function CreateOrgCard({
  title,
  description,
  buttonLabel,
  buttonAction,
}: Props) {
  const createOrgCardProps = useCreateOrgCardProps({ action: buttonAction });
  return (
    <Stack
      gap={3}
      justifyContent="space-between"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: brandColors.purple.main,
        borderRadius: 2,
        p: 3,
        mb: 4,
        background: 'rgba(154, 83, 255, 0.08)',
        alignItems: { xs: 'flex-start', md: 'center' },
        textAlign: 'left',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      {...createOrgCardProps}
    >
      <AddOrganizationIcon />
      <Stack flexGrow={1}>
        <Typography
          variant="body1"
          fontSize={16}
          color={brandColors.white.main}
        >
          {title}
        </Typography>
        <Typography
          fontSize={14}
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
    </Stack>
  );
}
