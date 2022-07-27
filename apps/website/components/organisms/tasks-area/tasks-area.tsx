import { useFieldArray, useFormContext } from 'react-hook-form';

import AddTaskCard from '../../molecules/add-task/add-task-card';
import FileLinkTask from '../../molecules/add-task/file-link-task/file-link-task';
import HoldTokenTask from '../../molecules/add-task/hold-token-task/hold-token-task';
import { QuizTask } from '../../molecules/add-task/quiz-task/quiz-task';
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
    default:
      return {
        ...defaultValues,
        task_data: {},
      };
  }
};

const TaskArea = () => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext<CreateGateTypes>();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'tasks.data',
    }
  );

  const addTask = async (
    taskType: CreateGateTypes['tasks']['data'][0]['task_type']
  ) => {
    console.log('addTask');
    const valid =
      fields.length > 0
        ? await trigger(`tasks.data.${fields.length - 1}`)
        : true;
    if (valid) {
      append({
        title: '',
        description: '',
        ...(defaultTaskData(taskType) as any),
      });
    }
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
