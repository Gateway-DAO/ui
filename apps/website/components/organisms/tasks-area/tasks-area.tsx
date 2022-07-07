import { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

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

  const addTask = (task_component, task_type) => {
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
        },
      ],
    });
    setValue('tasks', tasks);
  };

  const deleteTask = (id: number) => {
    setTasks({
      data: tasks.data.filter((task) => task.id !== id),
    });
  };

  return (
    <>
      {tasks.data.map((task) => {
        const TaskComponent = task.task_component;
        return (
          <TaskComponent
            key={task.id}
            taskId={task.id}
            deleteTask={deleteTask}
          />
        );
      })}
      <AddTaskCard addTask={addTask} />
    </>
  );
};

export default TaskArea;
