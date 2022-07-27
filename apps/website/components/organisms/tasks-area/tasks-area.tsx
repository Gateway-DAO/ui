import { useState } from 'react';

import { useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import AddTaskCard from '../../molecules/add-task/add-task-card';
import { CreateGateTypes } from '../../templates/create-gate/schema';

const TaskArea = () => {
  const [tasksCount, setTasksCount] = useState(0);
  const [tasksComponents, setTasksComponents] = useState([]);
  const {
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<CreateGateTypes>();
  const tasks = getValues().tasks || { data: [] };

  const addTask = async (taskComponent, task_type, object = {}) => {
    const taskData = {
      data: [
        ...tasks.data,
        {
          id: tasksCount,
          title: '',
          description: '',
          task_type,
          task_data: {},
          ...object,
        },
      ],
    };

    const valid = await trigger(`tasks.data.${tasks.data.length - 1}`);

    if (valid) {
      setTasksComponents([...tasksComponents, taskComponent]);
      setValue('tasks', taskData);
      setTasksCount(tasksCount + 1);
    }
  };

  const deleteTask = (index: number) => {
    const tasksCopy = { ...tasks };
    tasksCopy.data.splice(index, 1);

    setValue('tasks', tasksCopy);
    setTasksComponents(tasksComponents.filter((_, i) => i !== index));
    setTasksCount(tasksCount - 1);
  };

  console.log(errors);

  return (
    <>
      {tasksComponents.map((TaskComponent, index: number) => {
        return (
          <TaskComponent
            key={uuidv4()}
            taskId={index}
            deleteTask={deleteTask}
          />
        );
      })}
      <AddTaskCard numberOfTasks={tasksCount} addTask={addTask} />
    </>
  );
};

export default TaskArea;
