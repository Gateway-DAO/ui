import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { PartialDeep } from 'type-fest';

import {
  Avatar,
  AvatarGroup,
  Chip,
  Grid,
  Stack,
  Typography,
  Box,
  Divider,
} from '@mui/material';

import { Gates } from '../../../services/graphql/types.generated';
import CircularProgressWithLabel from '../../atoms/circular-progress-label';
import GateCompletedModal from '../../organisms/gates/view/modals/gate-completed';
import { Task, TaskGroup } from './tasks';

type Props = {
  gate: PartialDeep<Gates>;
};

export function GateViewTemplate({ gate }: Props) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid container height="100%">
      <GateCompletedModal open={open} handleClose={handleClose} gate={gate} />
      <Grid item xs={12} md={5} p={(theme) => theme.spacing(7)}>
        {/* DAO info */}
        <Stack
          direction="row"
          alignItems="center"
          marginBottom={(theme) => theme.spacing(2)}
        >
          <Avatar
            alt={gate.dao.name}
            src={gate.dao.logo_url}
            sx={{
              height: (theme) => theme.spacing(3),
              width: (theme) => theme.spacing(3),
              marginRight: (theme) => theme.spacing(1),
            }}
          />
          <Typography
            variant="body2"
            color={(theme) => theme.palette.text.secondary}
          >
            {gate.dao.name}
          </Typography>
        </Stack>

        <Typography variant="h4" marginBottom={(theme) => theme.spacing(2)}>
          {gate.title}
        </Typography>

        <Box marginBottom={(theme) => theme.spacing(4)}>
          {gate.categories.map((category, idx) => (
            <Chip
              key={'category-' + (idx + 1)}
              label={category}
              sx={{
                marginRight: (theme) => theme.spacing(1),
              }}
            />
          ))}
        </Box>

        <Typography variant="body1" marginBottom={(theme) => theme.spacing(4)}>
          {gate.description}
        </Typography>

        <Box
          component="img"
          src={gate.image}
          alt={gate.title + ' image'}
          marginBottom={(theme) => theme.spacing(4)}
          sx={{
            width: '100%',
            borderRadius: (theme) => theme.spacing(1),
          }}
        />

        <Grid container rowGap={(theme) => theme.spacing(3)}>
          <Grid item xs={4}>
            <Typography
              variant="body2"
              color={(theme) => theme.palette.text.secondary}
            >
              Holders
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <AvatarGroup
              total={5}
              sx={{
                justifyContent: 'flex-end',
              }}
            >
              <Avatar alt={gate.dao.name} src={gate.image} />
              <Avatar alt={gate.dao.name} src={gate.image} />
            </AvatarGroup>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="body2"
              color={(theme) => theme.palette.text.secondary}
            >
              Skills
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {gate.skills.map((skill, idx) => (
              <Chip
                key={'skill-' + (idx + 1)}
                label={skill}
                sx={{
                  marginRight: (theme) => theme.spacing(1),
                }}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item xs={12} md>
        {/* Task Counter */}
        <Stack
          direction="row"
          alignItems="center"
          m={(theme) => theme.spacing(7)}
          marginBottom={(theme) => theme.spacing(10)}
        >
          <CircularProgressWithLabel
            variant="determinate"
            value={(3 / gate.tasks.length) * 100}
            label={`3/${gate.tasks.length}`}
          />
          <Stack
            sx={{
              marginLeft: (theme) => theme.spacing(4),
            }}
          >
            <Typography variant="h6">Tasks</Typography>
            <Typography variant="caption">
              Complete the tasks to open this gate
            </Typography>
          </Stack>
        </Stack>

        <TaskGroup>
          {gate.tasks.map((task, idx) => (
            <Task key={'task-' + (idx + 1)} task={task} />
          ))}
        </TaskGroup>
      </Grid>
    </Grid>
  );
}
