import React from "react";

const RejectItem = ({ task, handleAccept }) => {
  return (
    <small
      className="grid border p-2 mt-3 hover:border-gray-400"
      style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
    >
      <p>{task.id}</p>
      <p>{task.title}</p>
      <button
        className="flex items-center justify-center mx-auto"
        onClick={() => handleAccept(task)}
      >
        <svg
          viewBox="0 0 665.8 1000"
          fill="currentColor"
          height="1.5em"
          width="1.5em"
          className="text-green-600"
        >
          <path d="M248 850c-22.667 0-41.333-9.333-56-28L12 586C1.333 570-2.667 552.667 0 534s11.333-34 26-46 31.667-16.667 51-14c19.333 2.667 35 12 47 28l118 154 296-474c10.667-16 25-26 43-30s35.667-1.333 53 8c16 10.667 26 25 30 43s1.333 35.667-8 53L306 816c-13.333 21.333-32 32-56 32l-2 2" />
        </svg>
      </button>
    </small>
  );
};

export default RejectItem;
