import React, { useState } from 'react';

const TaskItem = ({ task, markTaskDone, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleEdit = () => {
    if (isEditing) {
      // muokkauksen muutosten tallennus
      editTask(task.id, editValue);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
      {isEditing ? (
         <input 
           type="text" 
           value={editValue} 
           onChange={(e) => setEditValue(e.target.value)} 
         />
      ) : (
         <span>
           {task.title} <small>(Prioriteetti: {task.priority === 1 ? 'Korkea' : task.priority === 2 ? 'Keskitaso' : 'Matala'})</small>
         </span>
      )}
      <div className="task-buttons">
        <button
          type="button"
          onClick={() => markTaskDone(task.id)}
          style={{ backgroundColor: task.isCompleted ? 'green' : 'red', color: 'white' }}
        >
          Tehty
        </button>
        <button type="button" onClick={handleEdit}>
          {isEditing ? 'Tallenna' : 'Muokkaa'}
        </button>
        <button type="button" onClick={() => deleteTask(task.id)}>
          Poista
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
