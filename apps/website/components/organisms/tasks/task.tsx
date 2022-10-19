import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useToggle } from 'react-use';
import { PartialObjectDeep } from 'type-fest/source/partial-deep';
import { useAccount } from 'wagmi';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
  Collapse,
} from '@mui/material';

import { useAuth } from '../../../providers/auth';
import { Tasks } from '../../../services/graphql/types.generated';
import { queryClient } from '../../../services/query-client';
import { getMapValueFromObject } from '../../../utils/map-object';
import GithubContributeContent from '../gates/view/tasks/content/github_contribute';
import GithubPRContent from '../gates/view/tasks/content/github_prs';
import MeetingCodeContent from '../gates/view/tasks/content/meeting_code';
import NFTHoldContent from '../gates/view/tasks/content/nft_hold';
import QuizContent from '../gates/view/tasks/content/quiz';
import SelfVerifyContent from '../gates/view/tasks/content/self-verify';
import SnapshotContent from '../gates/view/tasks/content/snapshot';
import TokenHoldContent from '../gates/view/tasks/content/token_hold';
import TwitterFollowContent from '../gates/view/tasks/content/twitter_follow';
import TwitterRetweetContent from '../gates/view/tasks/content/twitter_retweet';
import TwitterTweetContent from '../gates/view/tasks/content/twitter_tweet';
import { backendMessages, taskErrorMessages } from './task-error-messages';

type Props = {
  idx?: number;
  task?: PartialObjectDeep<Tasks>;
  readOnly?: boolean;
  setCompletedGate?: (completed: boolean) => void;
  completed?: boolean;
  isAdmin?: boolean;
};

interface Error {
  response?: {
    errors?: {
      extensions?: {
        code: number;
        error: string;
      };
      message?: string;
    }[];
  };
}

export function Task({
  task,
  idx,
  readOnly,
  setCompletedGate,
  isAdmin = false,
  completed: completedProp = false,
}: Props) {
  const { me, gqlAuthMethods, onOpenLogin } = useAuth();
  const { address } = useAccount();

  const [expanded, toggleExpanded] = useToggle(false);
  const [defaultOpen, setOpen] = useState(true);
  const [completed, setCompleted] = useState(completedProp);
  const [updatedAt, setUpdatedAt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const progressTaskIndex = me?.task_progresses.findIndex(
      (task_progress) => task_progress.task_id === task.id
    );

    if (progressTaskIndex !== undefined && progressTaskIndex !== -1) {
      setCompleted(true);
      setUpdatedAt(me?.task_progresses[progressTaskIndex].updated_at);
      toggleExpanded(true);
    }
  }, [task.id, me?.task_progresses, toggleExpanded]);

  const getTaskContent = (task_type: string) => {
    const taskTypes = {
      self_verify: {
        title: 'Files & Links',
        body: SelfVerifyContent,
      },
      meeting_code: {
        title: 'Verification Code',
        body: MeetingCodeContent,
      },
      token_hold: {
        title: 'Hold Token',
        body: TokenHoldContent,
      },
      snapshot: {
        title: 'Snapshot',
        body: SnapshotContent,
      },
      quiz: {
        title: 'Quiz',
        body: QuizContent,
      },
      twitter_follow: {
        title: 'Twitter Follow',
        body: TwitterFollowContent,
      },
      twitter_retweet: {
        title: 'Retweet Post',
        body: TwitterRetweetContent,
      },
      twitter_tweet: {
        title: 'Post Tweet',
        body: TwitterTweetContent,
      },
      github_contribute: {
        title: 'Contribute to Repository',
        body: GithubContributeContent,
      },
      github_prs: {
        title: 'Verify Pull Requests',
        body: GithubPRContent,
      },
      nft_hold: {
        title: 'Hold NFT',
        body: NFTHoldContent,
      },
    };

    return (
      taskTypes[task_type] || {
        title: '',
        body: null,
      }
    );
  };

  const { mutate: completeTaskMutation, isLoading } = useMutation(
    ['completeTask', { gateId: task.gate_id, taskId: task.id }],
    gqlAuthMethods.complete_task,
    {
      onSuccess: async (data) => {
        try {
          await queryClient.cancelQueries(['me', me?.id]);

          queryClient.refetchQueries(['me', me?.id]);

          data.verify_key.completed_gate && setCompletedGate(true);

          data.verify_key.completed_gate &&
            queryClient.invalidateQueries(['me', me?.id]);
        } catch (err) {
          console.log(err);
        }
      },
    }
  );

  const completeTask = (info) => {
    if (!me) {
      return onOpenLogin();
    }

    const data = {
      task_id: task.id,
      info,
    };

    completeTaskMutation(data, {
      onSuccess: () => {
        setErrorMessage('');
      },
      onError: (error: Error) => {
        setErrorMessage(
          getMapValueFromObject(
            taskErrorMessages,
            backendMessages,
            error.response.errors[0].extensions.error,
            error.response.errors[0].message,
            `There was an unexpected error, please contact Gateway or try again`
          )
        );
      },
    });
  };

  const taskContent = getTaskContent(task.task_type);
  const TaskComponent = taskContent?.body;

  return (
    <Card
      sx={(theme) => ({
        borderRadius: 0,
        borderLeft: 'none',
        borderTop: 'none',
        backgroundColor: 'transparent !important',
        backgroundImage: 'none !important',
        px: { xs: theme.spacing(1), md: theme.spacing(7) },
        py: { xs: theme.spacing(1), md: theme.spacing(5) },
      })}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: completed
                ? '#6DFFB9'
                : expanded
                ? 'white'
                : 'transparent',
              color: (theme) =>
                expanded ? theme.palette.background.default : 'white',
              border: expanded ? 'none' : '1px solid #FFFFFF4D',
            }}
          >
            {completed ? (
              <CheckIcon htmlColor="#10041C" />
            ) : (
              idx || task.title[0]
            )}
          </Avatar>
        }
        title={<Typography variant="caption">{taskContent?.title}</Typography>}
        subheader={<Typography variant="h6">{task.title}</Typography>}
        action={
          <IconButton
            onClick={() => {
              idx == 1 && defaultOpen
                ? toggleExpanded(false)
                : toggleExpanded();
              setOpen(false);
            }}
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      />
      <Collapse
        in={idx == 1 && defaultOpen ? true : expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent sx={{ marginLeft: { xs: '0px', md: '55px' } }}>
          <Typography variant="subtitle2">{task.description}</Typography>
          <TaskComponent
            data={task.task_data}
            completed={completed}
            updatedAt={updatedAt}
            completeTask={completeTask}
            readOnly={readOnly}
            isLoading={isLoading}
            isAdmin={isAdmin}
          />
          {errorMessage && (
            <Typography variant="subtitle2" color="red" marginTop={2}>
              {errorMessage}
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
