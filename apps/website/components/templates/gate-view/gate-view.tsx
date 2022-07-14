import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

import { PartialDeep } from 'type-fest';

import { theme } from '@gateway/theme';

import {
  Avatar,
  AvatarGroup,
  Chip,
  Grid,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';

import { Gates } from '../../../services/graphql/types.generated';
import CircularProgressWithLabel from '../../atoms/circular-progress-label';

type Props = {
  gate: PartialDeep<Gates>;
};

export function GateViewTemplate({ gate }: Props) {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item xs={12} md={5}>
        {/* DAO info */}
        <Stack direction="row">
          <Avatar
            alt={gate.dao.name}
            src={gate.dao.logo_url}
            sx={{
              height: theme.spacing(3),
              width: theme.spacing(3),
            }}
          />
          <Typography variant="body2">{gate.dao.name}</Typography>
        </Stack>

        <Typography variant="h4">{gate.title}</Typography>
        {gate.categories.map((category, idx) => (
          <Chip key={'category-' + (idx + 1)} label={category} />
        ))}
        <Typography variant="body1">{gate.description}</Typography>

        <img src={gate.image} alt={gate.title + ' image'} />

        <Grid container>
          <Grid item xs={4}>
            <Typography variant="body2">Holders</Typography>
          </Grid>
          <Grid item xs={8}>
            <AvatarGroup
              total={24}
              sx={{
                justifyContent: 'flex-end',
              }}
            >
              <Avatar alt={gate.dao.name} src={gate.image} />
              <Avatar alt={gate.dao.name} src={gate.image} />
            </AvatarGroup>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">Skills</Typography>
          </Grid>
          <Grid item xs={8}>
            {gate.skills.map((skill, idx) => (
              <Chip key={'skill-' + (idx + 1)} label={skill} />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md>
        {/* Task Counter */}

        <Stack direction="row">
          <CircularProgressWithLabel
            variant="determinate"
            value={(3 / 4) * 100}
            label="3/4"
          />
          <Stack>
            <Typography>Tasks</Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
