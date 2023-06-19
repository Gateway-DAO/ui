import { brandColors } from '@/theme';

import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { Stack } from '@mui/material';

import { CirclePlusIcon } from './circle-plus-icon';

export function AddOrganizationIcon() {
  return (
    <Stack
      sx={(theme) => ({
        background: theme.palette.grey[900],
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderRadius: 40,
      })}
    >
      <WorkspacesIcon sx={{ color: brandColors.white.main }} />
      <CirclePlusIcon sx={{ position: 'absolute', top: 23, left: 23 }} />
    </Stack>
  );
}
