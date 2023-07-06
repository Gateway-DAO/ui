import { brandColors } from '@/theme';

import EditIcon from '@mui/icons-material/Edit';
import { alpha, Stack, Typography, SxProps, Theme } from '@mui/material';

type Props = {
  title: string;
  email: string;
  onClickEdit: (value: boolean) => void;
  sxProps?: SxProps<Theme>;
};

export function CardSummary({ title, email, onClickEdit, sxProps }: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      gap={1}
      alignItems="center"
      sx={{
        width: '100%',
        p: 2,
        backgroundColor: brandColors.background.elevated,
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        position: 'relative',
        ...sxProps,
      }}
    >
      <Stack direction="column">
        <Typography sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
        <Typography sx={{ color: alpha(brandColors.white.main, 0.7) }}>
          {email}
        </Typography>
      </Stack>
      <EditIcon
        onClick={() => onClickEdit(false)}
        sx={{
          color: alpha(brandColors.white.main, 0.7),
          cursor: 'pointer',
        }}
      />
    </Stack>
  );
}
