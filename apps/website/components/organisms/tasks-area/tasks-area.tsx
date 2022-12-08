import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useFieldArray, useFormContext } from 'react-hook-form';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, Button, Stack, Typography } from '@mui/material';

import AddTaskCard from '../../molecules/add-task/add-task-card';
import FileLinkTask from '../../molecules/add-task/file-link-task/file-link-task';
import GithubContributeTask from '../../molecules/add-task/github/contribute-task';
import GithubPRTask from '../../molecules/add-task/github/pr-task';
import HoldNFTTask from '../../molecules/add-task/hold-nft-task/hold-nft-task';
import HoldTokenTask from '../../molecules/add-task/hold-token-task/hold-token-task';
import { ManualTask } from '../../molecules/add-task/manual/manual-task';
import {
  QuizTask,
  createQuestion,
} from '../../molecules/add-task/quiz-task/quiz-task';
import SnapshotTask from '../../molecules/add-task/snapshot-task/snapshot-task';
import { FollowProfile } from '../../molecules/add-task/twitter-follow-profile/twitter-follow-profile';
import TwitterRetweetTask from '../../molecules/add-task/twitter-retweet/twitter-retweet';
import TwitterTweetTask from '../../molecules/add-task/twitter-tweet/twitter-tweet';
import VerificationCodeTask from '../../molecules/add-task/verification-task/verification-task';
import { CreateGateData, Task } from '../../templates/create-gate/schema';

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
  manual: ManualTask,
};

const defaultTaskData = (
  taskType: CreateGateData['tasks'][0]['task_type']
): Omit<Task, 'title' | 'description'> => {
  const defaultValues = {
    task_type: taskType,
    order: 0,
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
  draftTasks: Task[];
  onDelete: Dispatch<SetStateAction<string[]>>;
};

const TaskArea = ({ draftTasks, onDelete }: TaskAreaProps) => {
  const { control, setValue } = useFormContext<CreateGateData>();

  const { fields, append, remove, update, swap } = useFieldArray({
    control,
    name: 'tasks',
  });

  const [enableTaskReordering, setEnableTaskReordering] = useState(false);

  useEffect(() => {
    if (draftTasks.length > 0) {
      // Remove gate_ids from the tasks
      const formattedTasks = draftTasks.map((task) => {
        const { gate_id: _gate_id, id: task_id, ...newTask } = task;
        return { id: task_id, task_id, ...newTask };
      });
      setValue('tasks', formattedTasks);
    }
  }, [draftTasks, setValue]);

  const addTask = async (taskType: CreateGateData['tasks'][0]['task_type']) => {
    const highestOrder = Math.max(...fields.map((o) => o.order));
    append({
      title: '',
      description: '',
      ...(defaultTaskData(taskType) as any),
      order: highestOrder + 1,
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    swap(result.source.index, result.destination.index);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                width: '100%',
                paddingBottom: enableTaskReordering ? '100px' : '0',
              }}
            >
              {fields.length > 1 && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  sx={{ mb: 4 }}
                >
                  <Typography
                    sx={(theme) => ({
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.56)',
                      fontWeight: 600,
                      fontSize: '12px',
                      marginRight: '12px',
                      letterSpacing: '0.1px',
                    })}
                  >
                    Reorder
                  </Typography>
                  <Button
                    sx={(theme) => ({
                      position: 'relative',
                      display: 'block',
                      width: '32px',
                      minWidth: '32px',
                      height: '32px',
                      padding: '0',
                      textAlign: 'center',
                      background: enableTaskReordering
                        ? theme.palette.grey[200]
                        : theme.palette.background.light,
                      color: enableTaskReordering
                        ? theme.palette.grey[900]
                        : theme.palette.grey[400],
                      '&:hover': {
                        background: enableTaskReordering
                          ? theme.palette.grey[300]
                          : '#342741',
                      },
                    })}
                    onClick={(e) => {
                      e.preventDefault();
                      enableTaskReordering
                        ? setEnableTaskReordering(false)
                        : setEnableTaskReordering(true);
                    }}
                  >
                    <ArrowDropUpIcon
                      sx={{
                        fontSize: '24px',
                        position: 'absolute',
                        top: '1px',
                        left: '4px',
                      }}
                    />
                    <ArrowDropDownIcon
                      sx={{
                        fontSize: '24px',
                        position: 'absolute',
                        bottom: '0',
                        left: '4px',
                      }}
                    />
                  </Button>
                </Stack>
              )}
              {fields.map((task: Task, index: number) => {
                const TaskComponent = TaskComponents[task.task_type];
                return (
                  <Draggable
                    key={index}
                    draggableId={`t-${index}`}
                    index={index}
                    isDragDisabled={!enableTaskReordering}
                  >
                    {(provided) => (
                      <Stack
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        direction="row"
                        alignItems={'center'}
                        sx={{
                          width: '100%',
                          position: 'relative',
                        }}
                      >
                        {enableTaskReordering && (
                          <DragIndicatorIcon
                            sx={(theme) => ({
                              position: 'absolute',
                              top: 'calc(50% - 25px)',
                              left: '15px',
                              color: '#ddd',
                              [theme.breakpoints.down('sm')]: {
                                top: 'calc(50% - 25px)',
                                left: '10px',
                              },
                            })}
                          />
                        )}
                        <Box
                          sx={(theme) => ({
                            width: '100%',
                            mb: 4,
                            [theme.breakpoints.down('sm')]: {
                              mb: 3,
                            },
                          })}
                        >
                          <TaskComponent
                            dragAndDrop={enableTaskReordering}
                            taskId={index}
                            deleteTask={() => {
                              remove(index);
                              onDelete((prev: string[]) => [
                                ...prev,
                                task.task_id,
                              ]);
                            }}
                          />
                        </Box>
                      </Stack>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {!enableTaskReordering && (
          <AddTaskCard tasks={fields} addTask={addTask} />
        )}
      </DragDropContext>
    </>
  );
};

export default TaskArea;
