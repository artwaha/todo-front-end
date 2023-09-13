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
    isTaskOwner,
  } = useOutletContext();

  useEffect(() => {
    setTitle("Task Details");
    setMode("view");
  }, [setMode, setTitle, task]);

  return <>{taskDetails(task)}</>;

  function taskDetails() {
    return (
      <div>
        <h1 className="text-2xl mb-2 font-semibold">{task.title}</h1>

        <p className="text-gray-600 text-lg mb-4">{task.description}</p>

        <p>
          <span>Prioriy: </span>
          <span className="text-sm text-gray-600">{task.priority}</span>
        </p>
        <p>
          <span>Status: </span>
          <span className="text-sm text-gray-600 uppercase">
            {task.isCompleted ? "Completed" : "Pending"}
          </span>
        </p>
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

        {isTaskOwner && (
          <>
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
        )}
      </div>
    );
  }
};

export default ViewMode;
