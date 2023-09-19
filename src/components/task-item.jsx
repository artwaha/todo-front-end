import React from "react";
import { Link } from "react-router-dom";

const TaskItem = ({ task }) => {
  return (
    <small
      className="grid border p-2 mt-3 hover:border-gray-400"
      style={{ gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr" }}
    >
      <p>{task.id}</p>
      <p>{task.title}</p>
      <p>{task.priority}</p>
      <p className="uppercase">{task.isCompleted ? "Completed" : "Pending"}</p>
      <Link to={`/tasks/${task.id}`} className="ml-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 ml-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </Link>
    </small>
  );
};

export default TaskItem;
