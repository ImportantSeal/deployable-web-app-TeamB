import React, { useState } from 'react';

const TaskItem = ({ task, markTaskDone, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  // muokkaustilassa nimi, deadline ja prioriteetti
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDeadline, setEditDeadline] = useState(task.deadline);
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleEdit = () => {
    if (isEditing) {
      // painetaan "Tallenna", kutsutaan editTask-funktiota ja päivitetään useampi kenttä
      editTask(task.id, {
        title: editTitle,
        deadline: editDeadline,
        priority: editPriority,
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-info">
          {isEditing ? (
            <div className="edit-fields">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Muokkaa nimeä..."
              />
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(Number(e.target.value))}
              >
                <option value={1}>Korkea</option>
                <option value={2}>Keskitaso</option>
                <option value={3}>Matala</option>
              </select>
              <input
                type="text"
                value={editDeadline}
                onChange={(e) => setEditDeadline(e.target.value)}
                placeholder="Muokkaa deadlinea... (esim. 1.10 19.50)"
              />
            </div>
          ) : (
            <>
              <small className="task-date">
                Luotu: {new Date(task.id).toLocaleDateString('fi-FI')}{' '}
                {new Date(task.id).toLocaleTimeString('fi-FI')}
              </small>
              <div className="task-title">{task.title}</div>
              <div className="task-priority">
                <small>
                  Prioriteetti:{' '}
                  {task.priority === 1 ? 'Korkea' : task.priority === 2 ? 'Keskitaso' : 'Matala'}
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
    </div>
  </li>
  );
};

export default TaskItem;
