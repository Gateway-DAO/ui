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

import { Credentials } from '../../../services/graphql/types.generated';
import { Task, TaskGroup } from '../../organisms/tasks';

type Props = {
  credential: PartialDeep<Credentials>;
};

export function CredentialTemplate({ credential }: Props) {
  return (
    <Grid container height="100%">
      <Grid item xs={12} md={5} p={(theme) => theme.spacing(7)}>
        {/* DAO info */}
        <Stack
          direction="row"
          alignItems="center"
          marginBottom={(theme) => theme.spacing(2)}
        >
          <Avatar
            alt={credential.dao.name}
            src={`https://api.staging.mygateway.xyz/storage/file?id=${credential.dao.logo.id}`}
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
            {credential.dao.name}
          </Typography>
        </Stack>

        <Typography variant="h4" marginBottom={(theme) => theme.spacing(2)}>
          {credential.name}
        </Typography>

        <Box marginBottom={(theme) => theme.spacing(4)}>
          {credential.categories.map((category, idx) => (
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
          {credential.description}
        </Typography>
        <Box
          component="img"
          src={credential.image}
          alt={credential.name + ' image'}
          marginBottom={(theme) => theme.spacing(4)}
          sx={{
            width: '100%',
            borderRadius: (theme) => theme.spacing(1),
          }}
        />

        <Grid container rowGap={(theme) => theme.spacing(3)}>
          {credential.gate?.holders.length > 0 && (
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
                  {credential.gate?.holders.map((holder) => {
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
            {credential.skills.map((skill, idx) => (
              <Chip
                key={'skill-' + (idx + 1)}
                label={skill}
                sx={{
                  marginRight: (theme) => theme.spacing(1),
                }}
              />
            ))}
          </Grid>
          {credential.gate?.creator && (
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
                <Avatar
                  alt={credential.gate?.creator?.username}
                  src={credential.gate?.creator?.pfp}
                />
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
          {credential.pow.map((task, idx) => (
            <Task key={'task-' + (idx + 1)} task={task} readOnly />
          ))}
        </TaskGroup>
      </Grid>
    </Grid>
  );
}
