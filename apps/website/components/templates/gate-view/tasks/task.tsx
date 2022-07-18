import { useToggle } from 'react-use';
import { PartialObjectDeep } from 'type-fest/source/partial-deep';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Avatar,
  IconButton,
  Collapse,
} from '@mui/material';

import { Tasks } from '../../../../services/graphql/types.generated';

type Props = {
  idx?: number;
  task?: PartialObjectDeep<Tasks>;
};

export function Task({ task, idx }: Props) {
  const [expanded, toggleExpanded] = useToggle(false);

  return (
    <Card
      sx={{
        borderRadius: 0,
        borderLeft: 'none',
        backgroundColor: 'transparent !important',
        backgroundImage: 'none !important',
        px: (theme) => theme.spacing(7),
        py: (theme) => theme.spacing(5),
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: expanded ? 'white' : 'transparent',
              color: (theme) =>
                expanded ? theme.palette.background.default : 'white',
              border: expanded ? 'none' : '1px solid #FFFFFF4D',
            }}
          >
            {idx || task.title[0]}
          </Avatar>
        }
        title={<Typography variant="caption">File & Links</Typography>}
        subheader={<Typography variant="h6">{task.title}</Typography>}
        action={
          <IconButton onClick={toggleExpanded}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      />
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{
          paddingLeft: (theme) => theme.spacing(2) + 40,
        }}
      >
        <CardContent>
          <Typography>Hey</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained">Start</Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}
