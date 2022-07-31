import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { PartialDeep } from 'type-fest';

import ShareIcon from '@mui/icons-material/IosShare';
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
  Snackbar,
  IconButton,
} from '@mui/material';

import { useAuth } from '../../../../website/providers/auth';
import { useMint } from '../../../hooks/use-mint';
import { useSnackbar } from '../../../hooks/use-snackbar';
import { Gates } from '../../../services/graphql/types.generated';
import { AvatarFile } from '../../atoms/avatar-file';
import CircularProgressWithLabel from '../../atoms/circular-progress-label';
import GateCompletedModal from '../../organisms/gates/view/modals/gate-completed';
import { Task, TaskGroup } from './tasks';

type Props = {
  gate: PartialDeep<Gates>;
};

export function GateViewTemplate({ gate }: Props) {
  const { t } = useTranslation();
  const taskIds = gate.tasks.map((task) => task.id);
  const snackbar = useSnackbar();
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
    const completedTaskIds =
      me?.task_progresses.map((task) => task.task_id) || [];
    const allCompleted = taskIds.every((taskId) => {
      return completedTaskIds.includes(taskId);
    });

    setCompletedTasksCount(countSimiliarIds(completedTaskIds, taskIds));

    if (allCompleted) {
      setGateCompleted(true);
      handleOpen();
    }
  }, [taskIds, me?.task_progresses, completedTasksCount]);

  const onShare = () => {
    const data = {
      title: `${gate.title} @ Gateway`,
      url: window.location.href,
    };
    try {
      if (navigator?.share && navigator.canShare(data)) {
        navigator.share(data);
      } else if (navigator?.clipboard && navigator.clipboard) {
        snackbar.onOpen({ message: 'Copied link!' });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid container height="100%" sx={{ flexWrap: 'nowrap' }}>
      <GateCompletedModal open={open} handleClose={handleClose} gate={gate} />
      <Grid item xs={12} md={5} p={(theme) => theme.spacing(7)}>
        {/* DAO info */}
        <Link passHref href={`/dao/${gate.dao.id}`}>
          <Stack
            direction="row"
            alignItems="center"
            marginBottom={(theme) => theme.spacing(2)}
            sx={(theme) => ({
              minWidth: '408px',
              [theme.breakpoints.down('sm')]: {
                width: '100%',
              },
            })}
          >
            <AvatarFile
              alt={gate.dao.name}
              file={gate.dao.logo}
              fallback={gate.dao.logo_url}
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
        </Link>

        <Typography variant="h4" marginBottom={(theme) => theme.spacing(2)}>
          {gate.title}
        </Typography>

        <Box marginBottom={(theme) => theme.spacing(4)}>
          <Stack
            direction={'row'}
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box>
              {gate.categories.map((category, idx) => (
                <Chip
                  key={'category-' + (idx + 1)}
                  label={category}
                  sx={{
                    marginRight: (theme) => theme.spacing(1),
                    marginBottom: (theme) => theme.spacing(1),
                  }}
                />
              ))}
            </Box>
            <Stack>
              <IconButton
                sx={{
                  p: 0,
                }}
                onClick={onShare}
                key="share"
              >
                <Avatar>
                  <ShareIcon sx={{ mt: -0.25 }} />
                </Avatar>
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        <Typography
          variant="body1"
          marginBottom={(theme) => theme.spacing(4)}
          sx={{ wordBreak: 'break-word' }}
        >
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
                      <Link
                        key={holder.id}
                        passHref
                        href={`/profile/${holder.id}`}
                      >
                        <Avatar
                          component="a"
                          alt={holder.username}
                          src={holder.pfp}
                        />
                      </Link>
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
                  marginBottom: (theme) => theme.spacing(1),
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
                <Link passHref href={`/profile/${gate.creator.username}`}>
                  <Box component="a" sx={{ display: 'inline-block' }}>
                    <AvatarFile
                      alt={gate.creator.username}
                      file={gate.creator.picture}
                      fallback={'/logo.png'}
                    />
                  </Box>
                </Link>
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
      <Snackbar
        anchorOrigin={{
          vertical: snackbar.vertical,
          horizontal: snackbar.horizontal,
        }}
        open={snackbar.open}
        onClose={snackbar.handleClose}
        message={snackbar.message}
      />
    </Grid>
  );
}
