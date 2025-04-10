import React, { useState } from 'react';

// uusien tehtävien lisäyslomake, jossa valitaan myös prioriteetti
const TaskForm = ({ addTask }) => {
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState(2); // Oletuksena keskitaso
  const [deadlineInput, setDeadlineInput] = useState('') // Input esim. [1.10] tai [1.10 21.50]

  // lomakkeen lähetyksen käsittely
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(taskInput, priority, deadlineInput);
    setTaskInput('');
    setPriority(2); // palautetaan oletusarvo
    setDeadlineInput('')
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Lisää tehtävä</h3>
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
      <input
        type="text"
        placeholder="Lisää deadline... (esim. 1.10 19.50)"
        value={deadlineInput}
        onChange={(e) => setDeadlineInput(e.target.value)}
      />
      <button type="submit">Lisää</button>
    </form>
  );
};

export default TaskForm;
