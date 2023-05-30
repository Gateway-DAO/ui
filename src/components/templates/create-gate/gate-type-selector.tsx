import { useFormContext } from 'react-hook-form';

import { CheckCircle, ChevronRight, Send } from '@mui/icons-material';
import {
  Avatar,
  Box,
  ButtonBase,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { CreateGateData, type GateType } from './schema';

const types = [
  {
    type: 'task_based',
    title: 'Through requirements',
    description: 'Define the requirements to obtain the credential.',
    icon: CheckCircle,
  },
  {
    type: 'direct',
    title: 'Send credential directly',
    description:
      'Send this credential directly to someone or a group of people',
    icon: Send,
  },
] as const;

export function GateTypeSelector() {
  const methods = useFormContext<CreateGateData>();

  const onClick = (type: GateType) => () => {
    methods.setValue('type', type);
  };

  return (
    <>
      <Divider sx={{ margin: '60px 0', width: '100%' }} />
      <Stack
        direction="row"
        gap={{ lg: 5, xs: 2, md: 2 }}
        sx={(theme) => ({
          width: '100%',
          display: { xs: 'block', md: 'flex' },
          [theme.breakpoints.down('sm')]: { p: '0 20px' },
        })}
      >
        <Box
          sx={{
            maxWidth: {
              lg: `15%`,
            },
          }}
        >
          <Typography component="h2" variant="h5" gutterBottom>
            Define how to obtain
          </Typography>
          <Typography variant="body2" color={'text.secondary'} marginBottom={4}>
            Set what is necessary to do to obtain this credential
          </Typography>
        </Box>
        <Stack
          direction="column"
          sx={{
            margin: 'auto',
            width: '100%',
            maxWidth: { xs: '100%', md: '100%', lg: '80%' },
          }}
        >
          <Stack direction="column" divider={<Divider sx={{ zIndex: 10 }} />}>
            {types.map(({ type, title, description, icon: Icon }, index) => (
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
                    <Avatar
                      sx={{ backgroundColor: 'rgba(154, 83, 255, 0.08)' }}
                    >
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
            ))}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
