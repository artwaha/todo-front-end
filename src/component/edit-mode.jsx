import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const EditMode = () => {
  const {
    task,
    setTitle,
    collaborators,
    usersToInvite,
    pendingInvitations,
    handleInvite,
    setMode,
    handleChange,
    handleUndoSelection,
    handleMarkForRemoval,
    selectedCollaborators,
  } = useOutletContext();

  useEffect(() => {
    setTitle("Edit Task");
    setMode("edit");
  }, [setMode, setTitle]);

  return <>{taskDetails()}</>;

  function taskDetails() {
    return (
      <>
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            name="title"
            onChange={handleChange}
            placeholder={task.title}
            className="p-1 border border-blue-300 outline-none w-full mt-1 text-sm"
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder={task.description}
            className="p-1 border border-blue-300 outline-none w-full mt-1 text-sm"
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium text-gray-700">Status</label>
          <select
            name="isCompleted"
            onChange={handleChange}
            defaultValue={task.isCompleted}
            className="p-1 border border-blue-300 mt-1 text-sm outline-none"
          >
            <option value={true}>Completed</option>
            <option value={false}>Pending</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            onChange={handleChange}
            defaultValue={task.priority}
            className="p-1 border border-blue-300 mt-1 text-sm outline-none"
          >
            <option value="HIGH">High</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        {collaboratorsDiv()}

        <div className="mt-4">
          <label className="block font-medium text-gray-700">
            Pending Invitations
          </label>
          {pendingInvitations.length > 0 ? (
            <ul className="list-disc pl-6 text-gray-600 text-sm">
              {pendingInvitations.map((user) => (
                <li key={user.id} className="mt-1">
                  {user.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-2 text-sm pl-2">
              No Pending Invitations.
            </p>
          )}
        </div>

        <div className="mt-4">
          <label className="block font-medium text-gray-700">
            Users to Invite
          </label>
          {usersToInvite.length > 0 ? (
            <ul className="list-disc pl-6 text-sm text-gray-600">
              {usersToInvite.map((user) => (
                <li key={user.id} className="mt-1">
                  {user.name}
                  <button
                    onClick={() => handleInvite(user)}
                    className="text-sm ml-1 px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 font-semibold shadow-md transition duration-300 ease-in-out"
                  >
                    Invite
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-2 text-sm pl-2">
              No Users to invite .
            </p>
          )}
        </div>
      </>
    );
  }

  function collaboratorsDiv() {
    return (
      <div className="mt-4">
        <label className="block font-medium text-gray-700">Collaborators</label>
        {collaborators.length > 0 ? (
          <ul className="list-disc pl-6 text-gray-600 text-sm">
            {collaborators.map((collaborator) => (
              <li key={collaborator.id} className="mt-1 flex items-center">
                {collaborator.user.name}
                {collaboratorActionButton(collaborator)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2 text-sm pl-2">
            No collaborators for this task.
          </p>
        )}
      </div>
    );
  }

  function collaboratorActionButton(collaborator) {
    return (
      <button
        className={`ml-2 ${
          selectedCollaborators.includes(collaborator)
            ? "text-red-500"
            : "text-gray-500"
        }`}
        onClick={() =>
          selectedCollaborators.includes(collaborator)
            ? handleUndoSelection(collaborator)
            : handleMarkForRemoval(collaborator)
        }
      >
        {selectedCollaborators.includes(collaborator) ? (
          // Undo icon
          <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5">
            <path
              fill="currentColor"
              d="M5.34 4.468h2v2.557a7 7 0 11-1.037 10.011l1.619-1.185a5 5 0 10.826-7.384h2.591v2h-6v-6z"
            />
          </svg>
        ) : (
          // Mark for removal icon
          <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
            <path d="M6.5 1h3a.5.5 0 01.5.5v1H6v-1a.5.5 0 01.5-.5zM11 2.5v-1A1.5 1.5 0 009.5 0h-3A1.5 1.5 0 005 1.5v1H2.506a.58.58 0 00-.01 0H1.5a.5.5 0 000 1h.538l.853 10.66A2 2 0 004.885 16h6.23a2 2 0 001.994-1.84l.853-10.66h.538a.5.5 0 000-1h-.995a.59.59 0 00-.01 0H11zm1.958 1l-.846 10.58a1 1 0 01-.997.92h-6.23a1 1 0 01-.997-.92L3.042 3.5h9.916zm-7.487 1a.5.5 0 01.528.47l.5 8.5a.5.5 0 01-.998.06L5 5.03a.5.5 0 01.47-.53zm5.058 0a.5.5 0 01.47.53l-.5 8.5a.5.5 0 11-.998-.06l.5-8.5a.5.5 0 01.528-.47zM8 4.5a.5.5 0 01.5.5v8.5a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" />
          </svg>
        )}
      </button>
    );
  }
};

export default EditMode;
