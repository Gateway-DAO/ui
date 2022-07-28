import useTranslation from 'next-translate/useTranslation';
import { useState, useEffect } from 'react';

import { PartialDeep } from 'type-fest';

import ViewInArIcon from '@mui/icons-material/ViewInAr';
import {
  Avatar,
  AvatarGroup,
  Chip,
  Grid,
  Stack,
  Typography,
  Box,
  Divider,
  Button,
} from '@mui/material';

import { useAuth } from '../../../../website/providers/auth';
import { useMint } from '../../../hooks/use-mint';
import { Gates } from '../../../services/graphql/types.generated';
import CircularProgressWithLabel from '../../atoms/circular-progress-label';
import GateCompletedModal from '../../organisms/gates/view/modals/gate-completed';
import { Task, TaskGroup } from './tasks';

type Props = {
  gate: PartialDeep<Gates>;
};

export function GateViewTemplate({ gate }: Props) {
  const { t } = useTranslation();
  const taskIds = gate.tasks.map((task) => task.id);

  const { me } = useAuth();
  const { mint } = useMint();

  const [open, setOpen] = useState(false);
  const [gateCompleted, setGateCompleted] = useState(false);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const countSimiliarIds = (arr1: string[], arr2: string[]) => {
    return arr1.filter((id) => arr2.includes(id)).length;
  };

  useEffect(() => {
    const completedTaskIds = me?.task_progresses.map((task) => task.task_id);
    const allCompleted = taskIds.every((taskId) => {
      return completedTaskIds.includes(taskId);
    });

    setCompletedTasksCount(countSimiliarIds(completedTaskIds, taskIds));

    if (allCompleted) {
      setGateCompleted(true);
      handleOpen();
    }
  }, [taskIds, me?.task_progresses, completedTasksCount]);

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
        {gateCompleted && (
          <Button
            fullWidth
            variant="contained"
            sx={{ marginBottom: 4 }}
            startIcon={<ViewInArIcon />}
            onClick={() => mint()}
          >
            Mint as NFT
          </Button>
        )}
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
          {gate.holders.length > 0 && (
            <>
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
                  {gate.holders.map((holder) => {
                    return (
                      <Avatar
                        key={holder.id}
                        alt={holder.username}
                        src={holder.pfp}
                      />
                    );
                  })}
                </AvatarGroup>
              </Grid>
            </>
          )}
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
          {gate.creator && (
            <>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  color={(theme) => theme.palette.text.secondary}
                >
                  Created By
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Avatar alt={gate.creator?.username} src={gate.creator?.pfp} />
              </Grid>
            </>
          )}
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
            value={(completedTasksCount / gate.tasks.length) * 100}
            label={`${completedTasksCount}/${gate.tasks.length}`}
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
