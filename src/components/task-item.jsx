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
      <p className="mx-auto">
        <span
          className={`px-2 py-1 font-mono rounded-full w-fit ${
            task.priority === "HIGH"
              ? "text-white bg-[#FF0000]"
              : "text-white bg-green-600"
          }`}
        >
          {task.priority}
        </span>
      </p>
      <p className="mx-auto">
        <span className="uppercase px-2 py-1 font-mono rounded-full text-white bg-orange-500">
          {task.isCompleted ? "Completed" : "Pending"}
        </span>
      </p>
      <Link to={`/tasks/${task.id}`} className="ml-auto">
        {/* <Link to={`/tasks/333`} className="ml-auto"> */}
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
