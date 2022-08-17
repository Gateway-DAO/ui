import Link from 'next/link';

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
  Tooltip,
} from '@mui/material';

import { Credentials } from '../../../services/graphql/types.generated';
import { AvatarFile } from '../../atoms/avatar-file';
import { Task, TaskGroup } from '../../organisms/tasks';

type Props = {
  credential: PartialDeep<Credentials>;
};

export function CredentialTemplate({ credential }: Props) {
  return (
    <Grid container height="100%">
      <Grid
        item
        xs={12}
        md={5}
        sx={(theme) => ({
          p: { xs: theme.spacing(3), md: theme.spacing(7) },
        })}
      >
        {/* DAO info */}
        <Stack
          direction="row"
          alignItems="center"
          marginBottom={(theme) => theme.spacing(2)}
        >
          <AvatarFile
            file={credential.dao?.logo}
            fallback={credential.dao?.logo_url || '/logo.png'}
            sx={{ width: 32, height: 32 }}
            aria-label={`${credential.dao?.name}'s DAO image`}
          >
            {credential.dao?.name?.[0]}
          </AvatarFile>
          <Typography
            variant="body2"
            color={(theme) => theme.palette.text.secondary}
          >
            {credential.dao?.name}
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
                  total={
                    credential.gate?.holders.length >= 5
                      ? 5
                      : credential.gate?.holders.length
                  }
                  sx={{
                    justifyContent: 'flex-end',
                  }}
                >
                  {credential.gate?.holders.map((holder) => {
                    return (
                      <Link
                        key={holder.id}
                        passHref
                        href={`/profile/${holder.username}`}
                      >
                        <Tooltip title={holder.name}>
                          <Box component="a" sx={{ display: 'inline-block' }}>
                            <AvatarFile
                              alt={holder.username}
                              file={holder.picture}
                              fallback={holder.pfp || '/logo.png'}
                            />
                          </Box>
                        </Tooltip>
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
            {credential.skills.map((skill, idx) => (
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
                <Link
                  passHref
                  href={`/profile/${credential.gate?.creator.username}`}
                >
                  <Tooltip title={credential.gate?.creator.name}>
                    <Box component="a" sx={{ display: 'inline-block' }}>
                      <AvatarFile
                        alt={credential.gate?.creator.username}
                        file={credential.gate?.creator.picture}
                        fallback={'/logo.png'}
                      />
                    </Box>
                  </Tooltip>
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
          sx={(theme) => ({
            m: {
              xs: theme.spacing(2),
              md: theme.spacing(7),
            },
            mb: { xs: 3, md: 10 },
          })}
        >
          <Stack
            sx={(theme) => ({
              ml: { xs: theme.spacing(1), md: theme.spacing(4) },
            })}
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
