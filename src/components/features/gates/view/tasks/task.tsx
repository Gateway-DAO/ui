import { useEffect, useState } from 'react';

import { TaskIcon } from '@/components/atoms/icons/task-icon';
import { errorMessages } from '@/constants/error-messages';
import { useAuth } from '@/providers/auth';
import { Tasks, Gates } from '@/services/hasura/types';
import { queryClient } from '@/services/query-client';
import { getMapValueFromObject } from '@/utils/map-object';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToggle } from 'react-use';
import { PartialDeep } from 'type-fest';

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

import GithubContributeContent from './github/github_contribute';
import GithubPRContent from './github/github_prs';
import ManualContent from './manual/manual';
import MeetingCodeContent from './meeting_code';
import NFTHoldContent from './nft_hold';
import QuizContent from './quiz';
import SelfVerifyContent from './self-verify';
import SnapshotContent from './snapshot';
import TokenHoldContent from './token_hold';
import TwitterFollowContent from './twitter/twitter_follow';
import TwitterLikeContent from './twitter/twitter_like';
import TwitterRetweetContent from './twitter/twitter_retweet';
import TwitterTweetContent from './twitter/twitter_tweet';

type Props = {
  idx?: number;
  gate: PartialDeep<Gates>;
  task?: PartialDeep<Tasks>;
  isDefaultOpen?: boolean;
  readOnly?: boolean;
  completed?: boolean;
  isAdmin?: boolean;
};

interface Error {
  response?: {
    errors?: {
      extensions?: {
        code: number;
        error: string;
        attemptLeft: number;
      };
      message?: string;
    }[];
  };
}

export function Task({
  gate,
  task,
  isDefaultOpen,
  readOnly,
  isAdmin = false,
}: Props) {
  const { me, gqlAuthMethods, onOpenLogin } = useAuth();

  const taskProgress = me?.task_progresses.find(
    (task_progress) => task_progress.task_id === task.id
  );

  const completed = taskProgress?.completed === 'done';

  const [expanded, toggleExpanded] = useToggle(isDefaultOpen);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    toggleExpanded(isDefaultOpen);
  }, [isDefaultOpen, taskProgress?.id]);

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
      twitter_like: {
        title: 'Like Tweet',
        body: TwitterLikeContent,
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
      manual: {
        title: 'Manual Submission',
        body: ManualContent,
      },
    };

    return (
      taskTypes[task_type] || {
        title: '',
        body: null,
      }
    );
  };

  const { data: tp, refetch } = useQuery(
    ['findTaskProgressOfAUser', taskProgress?.id],
    () => gqlAuthMethods.findTaskProgressOfAUser({ id: taskProgress?.id })
  );

  const taskContent = getTaskContent(task.task_type);
  const TaskComponent = taskContent?.body;

  const { mutateAsync: completeTaskMutation, isLoading } = useMutation(
    ['completeTask', { gateId: task.gate_id, taskId: task.id }],
    gqlAuthMethods.complete_task,
    {
      onSuccess: () => {
        try {
          queryClient.resetQueries(['user_task_progresses', me?.id]);
        } catch (err) {
          console.log(err);
        }
      },
    }
  );

  const completeTask = async (info) => {
    if (!me) {
      return onOpenLogin();
    }

    const data = {
      task_id: task.id,
      info,
    };

    await completeTaskMutation(data, {
      onSuccess: () => {
        setErrorMessage('');
      },
      onError: async (error: Error) => {
        refetch();
        if (taskProgress?.id === undefined)
          await queryClient.resetQueries(['user_task_progresses', me?.id]);
        setErrorMessage(
          getMapValueFromObject(
            errorMessages,
            error.response.errors[0].extensions,
            `There was an unexpected error, please contact Gateway or try again`
          )
        );
      },
    });
  };

  return (
    <Card
      sx={(theme) => ({
        borderRadius: 0,
        borderLeft: 'none',
        borderTop: 'none',
        backgroundColor: 'transparent !important',
        backgroundImage: !expanded && 'none !important',
        px: { xs: theme.spacing(1), md: theme.spacing(7) },
        py: { xs: theme.spacing(1), md: theme.spacing(5) },
        position: 'relative',
      })}
    >
      <CardHeader
        avatar={
          <Avatar
            variant="rounded"
            sx={{
              backgroundColor: completed ? '#6DFFB9' : 'transparent',
              color: (theme) =>
                expanded ? theme.palette.background.default : 'white',
              border: expanded ? 'none' : '1px solid #FFFFFF4D',
            }}
          >
            {completed ? (
              <CheckIcon htmlColor="#10041C" />
            ) : (
              <TaskIcon type={task.task_type} />
            )}
          </Avatar>
        }
        title={<Typography variant="caption">{taskContent?.title}</Typography>}
        subheader={<Typography variant="h6">{task.title}</Typography>}
        action={
          <IconButton
            onClick={() => {
              toggleExpanded();
            }}
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{ marginLeft: { xs: '0px', md: '55px', marginTop: '24px' } }}
        >
          <Typography variant="subtitle2" fontSize={16}>
            {task.description}
          </Typography>
          <TaskComponent
            gate={gate}
            task={task}
            data={task.task_data}
            attemptCount={tp?.task_progress[0]?.attempt_count}
            completed={completed}
            updatedAt={completed ? taskProgress?.updated_at : ''}
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