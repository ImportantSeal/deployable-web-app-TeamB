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
    <div className="task-content">
      <div className="task-info">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        ) : (
          <>
            <small className='task-date'>Luotu: {new Date(task.id).toLocaleDateString('fi-FI')} {new Date(task.id).toLocaleTimeString('fi-FI')}</small>
            <div className="task-title">{task.title}</div>
            <div className="task-priority">
              <small>
                Prioriteetti: {task.priority === 1 ? 'Korkea' : task.priority === 2 ? 'Keskitaso' : 'Matala'}
              </small>
            </div>
            <div className="task-deadline">
              <small>Deadline: {task.deadline}</small>
            </div>
          </>
        )}
      </div>

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
    </div>
  </li>
  );
};

export default TaskItem;
