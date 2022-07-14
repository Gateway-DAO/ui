import { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import AddTaskCard from '../../molecules/add-task/add-task-card';
import { CreateGateTypes } from '../../templates/create-gate/schema';

const TaskArea = () => {
  const [tasksCount, setTasksCount] = useState(0);
  const [tasks, setTasks] = useState({ data: [] });

  const { setValue, getValues } = useFormContext<CreateGateTypes>();

  useEffect(() => {
    const values = getValues();
    setValue('tasks', values.tasks);
  }, [tasks, getValues, setValue]);

  const addTask = (task_component, task_type, object = {}) => {
    setTasksCount(tasksCount + 1);
    setTasks({
      data: [
        ...tasks.data,
        {
          id: tasksCount,
          title: '',
          description: '',
          task_type,
          task_data: {},
          task_component,
          ...object,
        },
      ],
    });
    setValue('tasks', tasks);
  };

  const deleteTask = (id: number) => {
    const tasksCopy = { ...tasks };
    tasksCopy.data.splice(id, 1);

    setTasks(tasksCopy);
    setValue('tasks', tasksCopy);
  };

  return (
    <>
      {tasks.data.map((task, idx: number) => {
        const TaskComponent = task.task_component;
        return (
          <TaskComponent key={uuidv4()} taskId={idx} deleteTask={deleteTask} />
        );
      })}
      <AddTaskCard addTask={addTask} />
    </>
  );
};

export default TaskArea;
