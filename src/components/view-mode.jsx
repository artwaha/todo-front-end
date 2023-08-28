import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const ViewMode = () => {
  const {
    task,
    setTitle,
    collaborators,
    usersToInvite,
    pendingInvitations,
    setMode,
  } = useOutletContext();

  useEffect(() => {
    setTitle("Task Details");
    setMode("view");
  }, [setMode, setTitle, task]);

  return <>{taskDetails(task)}</>;

  function taskDetails() {
    return (
      <>
        <div className="mb-2 flex font-semibold items-center">
          <h1 className="text-2xl">{task.title}</h1>
          <div className="ml-2">
            <span
              className={`px-2 py-1 font-mono rounded-full ${
                task.priority === "HIGH"
                  ? "text-white bg-[#FF0000]"
                  : "text-white  bg-green-600"
              }`}
            >
              {task.priority}
            </span>
            <span className="uppercase px-2 py-1 ml-2 font-mono rounded-full text-gray-50 bg-orange-500">
              {task.isCompleted ? "Completed" : "Pending"}
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-lg mb-6">{task.description}</p>

        <p>
          <span>Created By: </span>
          <span className="text-sm text-gray-600">{task.createdBy.name}</span>
        </p>
        {task.updatedBy && (
          <span>
            <p>
              <span>Last Updated: </span>
              <span className="text-sm text-gray-600">{task.lastUpdated}</span>
            </p>
            <p>
              <span>Updated By: </span>
              <span className="text-sm text-gray-600">
                {" "}
                {task.updatedBy.name}
              </span>
            </p>
          </span>
        )}

        <h3 className="text-xl font-semibold mt-8">Collaborators:</h3>
        {collaborators.length > 0 ? (
          <ul className="list-disc pl-6 text-gray-600 text-sm">
            {collaborators.map((collaborator) => (
              <li key={collaborator.id} className="mt-1">
                {collaborator.user.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2 pl-2">
            No collaborators for this task.
          </p>
        )}

        <h3 className="text-xl font-semibold mt-8">Pending Invitations:</h3>
        {pendingInvitations.length > 0 ? (
          <ul className="list-disc pl-6 text-gray-600 text-sm">
            {pendingInvitations.map((user) => (
              <li key={user.id} className="mt-1">
                {user.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2 pl-2">No Pending Invitations.</p>
        )}

        <h3 className="text-xl font-semibold mt-8">Users to Invite:</h3>
        {usersToInvite.length > 0 ? (
          <ul className="list-disc pl-6 text-gray-600 text-sm">
            {usersToInvite.map((user) => (
              <li key={user.id} className="mt-1">
                {user.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2 pl-2">No Users to invite .</p>
        )}
      </>
    );
  }
};

export default ViewMode;
