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
        className="text-green-500 hover:underline hover:font-semibold"
        onClick={() => handleAccept(task)}
      >
        Accept
      </button>
    </small>
  );
};

export default RejectItem;
