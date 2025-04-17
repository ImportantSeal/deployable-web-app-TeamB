import React, { useState, useEffect } from 'react';
import Header from './Header';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskSearch from './TaskSearch';
import Footer from './Footer';
import './App.css';

const App = () => {
  // Ladataan taskit local storagesta
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState("date");

  // Tallennetaan taskit local storageen aina kun ne muuttuvat
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Lisätään uusi tehtävä, jossa mukana prioriteetti (1 = korkea, 2 = keskitaso, 3 = matala)
  const addTask = (taskTitle, priority, taskDeadline) => {
    if (taskTitle.trim() === '') return;

    const newTask = {
      id: Date.now(), // Käytetään aikaleimaa uniikkina id:na
      title: taskTitle,
      isCompleted: false,
      priority: priority,
      deadline: taskDeadline,
    };

    // Lisätään uusi tehtävä listan alkuun
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  // Merkataan tehtävä suoritetuksi / ei suoritetuksi
  const markTaskDone = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  // Poistofunktio: suodatetaan pois se tehtävä, jonka id vastaa annettua id:tä
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Tehtävän muokkaus
  const editTask = (taskId, updatedFields) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updatedFields } : task
      )
    );
  };

  // Filterin muuttujan vaihto
  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  // Suodatetaan hakutermin perusteella
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dealine sorttauksen avuksi lisätään tarvittaessa 0 päivämäärään, kuukauteen ja aikaan
  const padDeadlineString = (str) => {
    try {
      if (!str || typeof str !== "string") return "99.99 99.99";

      const [datePart, timePart = "0.0"] = str.trim().split(" ");
      const [day, month] = datePart.split(".");
      const [hour = "0", minute = "0"] = timePart.split(".");

      if (!day || !month) return "99.99 99.99";

      const paddedDay = day.padStart(2, "0");
      const paddedMonth = month.padStart(2, "0");
      const paddedHour = hour.padStart(2, "0");
      const paddedMinute = minute.padStart(2, "0");

      return `${paddedMonth}.${paddedDay} ${paddedHour}.${paddedMinute}`;
    } catch {
      return "00.00 00.00";
    }
  };

  // Tehtävien sorttaus filterin perusteella
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (filterBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (filterBy === "status") {
      return a.isCompleted - b.isCompleted;
    } else if (filterBy === "priority") {
      // Näytetään ensin korkean prioriteetin tehtävät (1 ennen 2 ennen 3)
      return a.priority - b.priority;
    } else if (filterBy === "deadline") {
      return padDeadlineString(a.deadline).localeCompare(padDeadlineString(b.deadline))
    }  else {
      return b.id - a.id;
    }
  });

  return (
    <div className="app-container">
      <Header />
      <TaskForm addTask={addTask} />
      <TaskSearch setSearchTerm={setSearchTerm} />


      {/* Filter */}
      <div className="filter-container">
        <label htmlFor="filter">Suodatus: </label>
        <select id="filter" value={filterBy} onChange={handleFilterChange}>
          <option value="date">Päivämäärä</option>
          <option value="title">Nimi</option>
          <option value="status">Tila</option>
          <option value="priority">Prioriteetti</option>
          <option value="deadline">Deadline</option>
        </select>
      </div>

      <TaskList
        tasks={sortedTasks}
        markTaskDone={markTaskDone}
        deleteTask={deleteTask}
        editTask={editTask}
      />
      <Footer />
    </div>
  );
};

export default App;
