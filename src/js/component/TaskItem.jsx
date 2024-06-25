import React from "react";
import { MdDeleteForever } from "react-icons/md";

export const TaskItem = ({ task, deleteTask, toggleCheck }) => {
  return (
    <div className="listItems">
      <div className="itemsText">
        <input
          type="checkbox"
          checked={task.checked}
          onChange={() => toggleCheck(task.taskName)}
        />
        <p className={task.checked ? "isChecked" : " "}>{task.label}</p>
        <MdDeleteForever
          className="deleteIcon"
          onClick={() => deleteTask(task.taskName)}
        />
      </div>
    </div>
  );
};

export default TaskItem;
