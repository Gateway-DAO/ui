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
import MeetingCodeContent from '../../../organisms/gates/view/tasks/content/meeting_code';
import QuizContent from '../../../organisms/gates/view/tasks/content/quiz';
import SelfVerifyContent from '../../../organisms/gates/view/tasks/content/self-verify';
import SnapshotContent from '../../../organisms/gates/view/tasks/content/snapshot';
import TokenHoldContent from '../../../organisms/gates/view/tasks/content/token_hold';

type Props = {
  idx?: number;
  task?: PartialObjectDeep<Tasks>;
};

export function Task({ task, idx }: Props) {
  const [expanded, toggleExpanded] = useToggle(false);

  const getTaskContent = (task_type: string) => {
    switch (task_type) {
      case 'self_verify':
        return {
          title: 'Files & Links',
          body: SelfVerifyContent,
          action: 'Submit',
        };
      case 'meeting_code':
        return {
          title: 'Verification Code',
          body: MeetingCodeContent,
          action: 'Submit',
        };
      case 'token_hold':
        return {
          title: 'Hold Token',
          body: TokenHoldContent,
          action: 'Check Token',
        };
      case 'snapshot':
        return {
          title: 'Snapshot',
          body: SnapshotContent,
          action: 'Check Snapshot',
        };
      case 'quiz':
        return {
          title: 'Quiz',
          body: QuizContent,
          action: 'Submit',
        };
    }
  };

  const taskContent = getTaskContent(task.task_type);
  const TaskComponent = taskContent?.body;

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
        title={<Typography variant="caption">{taskContent?.title}</Typography>}
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
        <CardContent sx={{ marginLeft: '55px' }}>
          <Typography variant="subtitle2">{task.description}</Typography>
          <TaskComponent data={task.task_data} />
        </CardContent>
        <CardActions>
          <Button variant="contained" sx={{ marginLeft: '55px' }}>
            {taskContent?.action}
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}
