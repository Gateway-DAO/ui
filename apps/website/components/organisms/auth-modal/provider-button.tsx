import { Stack, StackProps, Typography } from '@mui/material';

type Props = StackProps & {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
};

export function ProviderButton({ onClick, label, icon, ...props }: Props) {
  return (
    <Stack
      {...props}
      onClick={onClick}
      direction="column"
      alignItems="center"
      flex={1}
      mt={2}
      borderRadius={2}
      p={3}
      sx={{
        border: '1px solid #E5E5E51F',
        ':hover': {
          border: '2px solid',
          borderColor: 'primary.main',
          cursor: 'pointer',
          backgroundColor: '#9A53FF14',
        },
      }}
    >
      {icon}
      <Typography variant="button" fontWeight={700} mt={1}>
        {label}
      </Typography>
    </Stack>
  );
}
