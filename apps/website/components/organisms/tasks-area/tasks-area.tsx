import { useEffect } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import AddTaskCard from '../../molecules/add-task/add-task-card';
import FileLinkTask from '../../molecules/add-task/file-link-task/file-link-task';
import HoldTokenTask from '../../molecules/add-task/hold-token-task/hold-token-task';
import {
  QuizTask,
  createQuestion,
} from '../../molecules/add-task/quiz-task/quiz-task';
import SnapshotTask from '../../molecules/add-task/snapshot-task/snapshot-task';
import VerificationCodeTask from '../../molecules/add-task/verification-task/verification-task';
import { CreateGateTypes, Task } from '../../templates/create-gate/schema';

const TaskComponents = {
  meeting_code: VerificationCodeTask,
  self_verify: FileLinkTask,
  snapshot: SnapshotTask,
  token_hold: HoldTokenTask,
  quiz: QuizTask,
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

const TaskArea = ({ tasks }) => {
  const { control, setValue } = useFormContext<CreateGateTypes>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks.data',
  });

  useEffect(() => {
    let formattedTasks = tasks;

    if (tasks.length > 0) {
      // Remove gate_ids from the tasks
      formattedTasks = tasks.map((task) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { gate_id, ...newTask } = task;
        return newTask;
      });
    }

    setValue('tasks.data', formattedTasks);
  }, [tasks, setValue]);

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
      {fields.map((task, index) => {
        const TaskComponent = TaskComponents[task.task_type];
        return (
          <TaskComponent
            key={task.id}
            taskId={index}
            deleteTask={() => remove(index)}
          />
        );
      })}
      <AddTaskCard numberOfTasks={fields.length} addTask={addTask} />
    </>
  );
};

export default TaskArea;
