import React from "react";

const Invitation = ({ invitation, handleAccept, handleReject }) => {
  return (
    <small
      className="grid border p-2 mt-3 hover:border-gray-400"
      style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
    >
      <p>{invitation.id}</p>
      <p>{invitation.title}</p>
      <div className="mx-auto grid grid-cols-2 gap-2">
        <button
          className="text-green-500 hover:underline hover:font-semibold"
          onClick={() => handleAccept(invitation)}
        >
          Accept
        </button>
        <button
          className="text-red-500 hover:underline hover:font-semibold"
          onClick={() => handleReject(invitation)}
        >
          Reject
        </button>
      </div>
    </small>
  );
};

export default Invitation;
