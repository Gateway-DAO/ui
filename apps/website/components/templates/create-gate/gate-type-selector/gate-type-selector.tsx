import { useFormContext } from 'react-hook-form';

import { ChevronRight } from '@mui/icons-material';
import {
  Avatar,
  Box,
  ButtonBase,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { CreateGateTypes, type GateType } from '../schema';
import { useGateTypes } from './gate-type';

export function GateTypeSelector() {
  const { types, typesContent } = useGateTypes();
  const methods = useFormContext<CreateGateTypes>();

  const onClick = (type: GateType) => () => {
    methods.setValue('type', type);
    // Cleanup data from direct gate and task based gate
    // methods.setValue('direct_gate', undefined);
    methods.setValue('tasks', undefined);
  };

  return (
    <Stack direction="column" divider={<Divider sx={{ zIndex: 10 }} />}>
      {types.map((type, index) => {
        const { description, icon: Icon, title } = typesContent[type];
        return (
          <Paper
            component={ButtonBase}
            elevation={1}
            onClick={onClick(type)}
            sx={[
              {
                justifyContent: 'flex-start',
                textAlign: 'left',
                borderRadius: 0,
                borderLeft: '1px solid',
                borderRight: '1px solid',
                px: { xs: 2, md: 6 },
                py: { xs: 2.5, md: 6 },
              },
              index === 0 && {
                borderTop: '1px solid',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              },
              index === types.length - 1 && {
                borderBottom: '1px solid',
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
              },
              {
                borderColor: 'divider',
              },
            ]}
            key={type}
          >
            <Stack
              direction="row"
              gap={2}
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Stack direction="row" alignItems="center" gap={2}>
                <Avatar sx={{ backgroundColor: 'rgba(154, 83, 255, 0.08)' }}>
                  <Icon color="primary" />
                </Avatar>
                <Box>
                  <Typography variant="h6" color="primary">
                    {title}
                  </Typography>
                  <Typography variant="caption">{description}</Typography>
                </Box>
              </Stack>
              <ChevronRight color="disabled" />
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}
