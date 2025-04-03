import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, markTaskDone, deleteTask, editTask }) => {
  return (
    <div className="task-list">
      <ul>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            markTaskDone={markTaskDone}
            deleteTask={deleteTask}
            editTask={editTask}  
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
