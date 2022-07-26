import { useState } from 'react';

import { useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import AddTaskCard from '../../molecules/add-task/add-task-card';
import { CreateGateTypes } from '../../templates/create-gate/schema';

const TaskArea = () => {
  const [tasksCount, setTasksCount] = useState(0);
  const [tasks, setTasks] = useState({ data: [] });
  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
    control,
  } = useFormContext<CreateGateTypes>();

  const addTask = (task_component, task_type, object = {}) => {
    trigger(`tasks.data.${tasksCount}.task_data`);
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      const taskData = {
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
      };

      setTasksCount(tasksCount + 1);
      setTasks(taskData);
    }
  };

  const deleteTask = (index: number) => {
    const tasksCopy = { ...tasks };
    tasksCopy.data.splice(index, 1);

    setTasks(tasksCopy);
    setValue('tasks', tasksCopy);
  };

  return (
    <>
      {tasks.data.map((task, index: number) => {
        const TaskComponent = task.task_component;
        return (
          <TaskComponent
            key={uuidv4()}
            taskId={index}
            deleteTask={deleteTask}
          />
        );
      })}
      <AddTaskCard numberOfTasks={tasks.data.length} addTask={addTask} />
    </>
  );
};

export default TaskArea;
