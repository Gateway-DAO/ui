import { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import AddTaskCard from '../../molecules/add-task/add-task-card';
import { CreateGateTypes } from '../../templates/create-gate/schema';

const TaskArea = () => {
  const [tasksCount, setTasksCount] = useState(0);
  const [tasks, setTasks] = useState([]);

  const { setValue, getValues } = useFormContext<CreateGateTypes>();

  useEffect(() => {
    const values = getValues();
    setValue('tasks', values.tasks);
  }, [tasks, getValues, setValue]);

  const addTask = (taskType) => {
    setTasksCount(tasksCount + 1);
    setTasks([
      ...tasks,
      {
        id: tasksCount,
        type: taskType,
      },
    ]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      {tasks.map((task) => {
        const TaskComponent = task.type;
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
