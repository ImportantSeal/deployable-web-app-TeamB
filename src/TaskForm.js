import React, { useState } from 'react';

// uusien tehtävien lisäyslomake, jossa valitaan myös prioriteetti
const TaskForm = ({ addTask }) => {
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState(2); // Oletuksena keskitaso

  // lomakkeen lähetyksen käsittely
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(taskInput, priority);
    setTaskInput('');
    setPriority(2); // palautetaan oletusarvo
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Kirjoita uusi tehtävä..." 
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <select 
        value={priority} 
        onChange={(e) => setPriority(Number(e.target.value))}
      >
        <option value={1}>Korkea</option>
        <option value={2}>Keskitaso</option>
        <option value={3}>Matala</option>
      </select>
      <button type="submit">Lisää</button>
    </form>
  );
};

export default TaskForm;
