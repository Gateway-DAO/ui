import { useState } from 'react';

import AddTaskCard from '../../molecules/add-task/add-task-card';

const TaskArea = () => {
  const [tasksCount, setTasksCount] = useState(0);
  const [tasks, setTasks] = useState([]);

  const addTask = (taskType) => {
    setTasksCount(tasksCount + 1);
    setTasks([...tasks, { id: tasksCount, type: taskType }]);
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
