import React from "react";
import { MdDeleteForever } from "react-icons/md";

export const TaskItem = ({ task, deleteTask, toggleCheck }) => {
  return (
    <div className="listItems">
      <div className="itemsText">
        <input
          type="checkbox"
          checked={task.is_done}
          onChange={() => toggleCheck(task.label)}
        />
        <p className={task.is_done ? "isChecked" : ""}>{task.label}</p>
        <MdDeleteForever
          className="deleteIcon"
          onClick={() => deleteTask(task.label)}
        />
      </div>
    </div>
  );
};

export default TaskItem;
