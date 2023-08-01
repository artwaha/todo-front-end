import React, { useEffect } from "react";
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
  } = useOutletContext();

  useEffect(() => {
    setTitle("Edit Task");
    setMode("edit");
    return () => {
      setMode("");
    };
  }, [setMode, setTitle]);

  return taskDetails();

  function taskDetails() {
    return (
      <div>
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            placeholder={task.title}
            className="p-1 border border-blue-300 outline-none w-full mt-1 text-sm"
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            placeholder={task.description}
            className="p-1 border border-blue-300 outline-none w-full mt-1 text-sm"
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium text-gray-700">Status</label>
          <select
            defaultValue={task.completed}
            className="p-1 border border-blue-300 mt-1 text-sm outline-none"
          >
            <option value={true}>Completed</option>
            <option value={false}>Pending</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block font-medium text-gray-700">Priority</label>
          <select
            defaultValue={task.priority}
            className="p-1 border border-blue-300 mt-1 text-sm outline-none"
          >
            <option value="HIGH">High</option>
            <option value="LOW">Low</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block font-medium text-gray-700">
            Collaborators
          </label>
          {collaborators.length > 0 ? (
            <ul className="list-disc pl-6 text-gray-600 text-sm">
              {collaborators.map((collaborator) => (
                <li key={collaborator.id} className="mt-1">
                  {collaborator.user.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-2 text-sm pl-2">
              No collaborators for this task.
            </p>
          )}
        </div>

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
      </div>
    );
  }
};

export default EditMode;
