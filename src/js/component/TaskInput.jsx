import React, { useState } from "react";

export function TaskInput({ addTask }) {
  const [task, setTask] = useState("");

  const handleInputValue = (event) => {
    setTask(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    addTask(task);
    setTask("");
  };

  return (
    <form className="inputField" onSubmit={handleAddTask}>
      <input
        type="text"
        value={task}
        className="TodoInput"
        placeholder="Anything new today?"
        onChange={handleInputValue}
      />
      <button type="submit" className="TodoBtn">
        Add task
      </button>
    </form>
  );
}
