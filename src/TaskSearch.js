import React from 'react';

const TaskSearch = ({ setSearchTerm }) => {
  return (
    <div className="task-search">
      <input 
        type="text" 
        placeholder="Hae tehtäviä..." 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
    </div>
  );
};

export default TaskSearch;
