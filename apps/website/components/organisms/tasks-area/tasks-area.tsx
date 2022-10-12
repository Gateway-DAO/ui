import { Dispatch, SetStateAction, useEffect } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import AddTaskCard from '../../molecules/add-task/add-task-card';
import FileLinkTask from '../../molecules/add-task/file-link-task/file-link-task';
import GithubContributeTask from '../../molecules/add-task/github/contribute-task';
import GithubPRTask from '../../molecules/add-task/github/pr-task';
import HoldNFTTask from '../../molecules/add-task/hold-nft-task/hold-nft-task';
import HoldTokenTask from '../../molecules/add-task/hold-token-task/hold-token-task';
import {
  QuizTask,
  createQuestion,
} from '../../molecules/add-task/quiz-task/quiz-task';
import SnapshotTask from '../../molecules/add-task/snapshot-task/snapshot-task';
import { FollowProfile } from '../../molecules/add-task/twitter-follow-profile/twitter-follow-profile';
import TwitterRetweetTask from '../../molecules/add-task/twitter-retweet/twitter-retweet';
import TwitterTweetTask from '../../molecules/add-task/twitter-tweet/twitter-tweet';
import VerificationCodeTask from '../../molecules/add-task/verification-task/verification-task';
import {
  CreateGateTypes,
  DraftTasksSchema,
  Task,
} from '../../templates/create-gate/schema';

const TaskComponents = {
  meeting_code: VerificationCodeTask,
  self_verify: FileLinkTask,
  snapshot: SnapshotTask,
  token_hold: HoldTokenTask,
  nft_hold: HoldNFTTask,
  quiz: QuizTask,
  twitter_follow: FollowProfile,
  twitter_tweet: TwitterTweetTask,
  twitter_retweet: TwitterRetweetTask,
  github_contribute: GithubContributeTask,
  github_prs: GithubPRTask,
};

const defaultTaskData = (
  taskType: CreateGateTypes['tasks']['data'][0]['task_type']
): Omit<Task, 'title' | 'description'> => {
  const defaultValues = {
    task_type: taskType,
  };
  switch (taskType) {
    case 'self_verify':
      return {
        ...defaultValues,
        task_data: {
          files: [{ title: '', description: '', link: '' }],
        },
      };
    case 'quiz':
      return {
        ...defaultValues,
        task_data: {
          pass_score: 1,
          questions: [createQuestion()],
        },
      };
    default:
      return {
        ...defaultValues,
        task_data: {},
      };
  }
};

type TaskAreaProps = {
  draftTasks: DraftTasksSchema;
  onDelete: Dispatch<SetStateAction<string[]>>;
};

const TaskArea = ({ draftTasks, onDelete }: TaskAreaProps) => {
  const { control, setValue } = useFormContext<CreateGateTypes>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks.data',
  });

  useEffect(() => {
    if (draftTasks.length > 0) {
      // Remove gate_ids from the tasks
      const formattedTasks = draftTasks.map((task) => {
        const { gate_id: _gate_id, id: task_id, ...newTask } = task;
        return { id: task_id, task_id, ...newTask };
      });
      setValue('tasks.data', formattedTasks);
    }
  }, [draftTasks, setValue]);

  const addTask = async (
    taskType: CreateGateTypes['tasks']['data'][0]['task_type']
  ) => {
    append({
      title: '',
      description: '',
      ...(defaultTaskData(taskType) as any),
    });
  };

  return (
    <>
      {fields.map((task: Task, index: number) => {
        const TaskComponent = TaskComponents[task.task_type];
        return (
          <TaskComponent
            key={task.task_id}
            taskId={index}
            deleteTask={() => {
              remove(index);
              onDelete((prev: string[]) => [...prev, task.task_id]);
            }}
          />
        );
      })}
      <AddTaskCard numberOfTasks={fields.length} addTask={addTask} />
    </>
  );
};

export default TaskArea;
