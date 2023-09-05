import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const EditMode = () => {
  const {
    setFormData,
    task,
    setTitle,
    collaborators,
    usersToInvite,
    pendingInvitations,
    setMode,
    handleChange,
    handleCollaboratorsUndoSelection,
    handleMarkCollaborators,
    selectedCollaborators,
    handleMarkUsersToInvite,
    handleUsersToInviteUndoSelection,
    selectedUsersToInvite,
    selectedPendingInvitations,
    handleMarkPendingInvitations,
    handlePendingInvitationsUndoSelection,
    isTaskOwner,
  } = useOutletContext();

  useEffect(() => {
    setTitle("Edit Task");
    setMode("edit");

    return () => {
      // Rset formData
      setFormData({});
    };
  }, [setFormData, setMode, setTitle]);

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

        {isTaskOwner && (
          <>
            {collaboratorsDiv()}

            {pendingInvitationsDiv()}

            {usersToInviteDiv()}
          </>
        )}
      </>
    );
  }

  function usersToInviteDiv() {
    return (
      <div className="mt-4">
        <label className="block font-medium text-gray-700">
          Users to Invite
        </label>
        {usersToInvite.length > 0 ? (
          <ul className="list-disc pl-6 text-sm text-gray-600">
            {usersToInvite.map((user) => (
              <li key={user.id} className="mt-1 flex items-center">
                {user.name}
                {userToInviteActionButton(user)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2 text-sm pl-2">
            No Users to invite .
          </p>
        )}
      </div>
    );
  }

  function userToInviteActionButton(user) {
    return (
      <button
        className={`ml-2 ${
          selectedUsersToInvite.includes(user)
            ? "text-red-500"
            : "text-gray-500"
        }`}
        onClick={() =>
          selectedUsersToInvite.includes(user)
            ? handleUsersToInviteUndoSelection(user)
            : handleMarkUsersToInvite(user)
        }
      >
        {selectedUsersToInvite.includes(user) ? (
          // Undo icon
          <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5">
            <path
              fill="currentColor"
              d="M5.34 4.468h2v2.557a7 7 0 11-1.037 10.011l1.619-1.185a5 5 0 10.826-7.384h2.591v2h-6v-6z"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
            <path d="M288 256c52.79 0 99.43-49.71 104-110.82 2.27-30.7-7.36-59.33-27.12-80.6C345.33 43.57 318 32 288 32c-30.24 0-57.59 11.5-77 32.38-19.63 21.11-29.2 49.8-27 80.78C188.49 206.28 235.12 256 288 256zM495.38 439.76c-8.44-46.82-34.79-86.15-76.19-113.75C382.42 301.5 335.83 288 288 288s-94.42 13.5-131.19 38c-41.4 27.6-67.75 66.93-76.19 113.75-1.93 10.73.69 21.34 7.19 29.11A30.94 30.94 0 00112 480h352a30.94 30.94 0 0024.21-11.13c6.48-7.77 9.1-18.38 7.17-29.11zM104 288v-40h40a16 16 0 000-32h-40v-40a16 16 0 00-32 0v40H32a16 16 0 000 32h40v40a16 16 0 0032 0z" />
          </svg>
        )}
      </button>
    );
  }

  function pendingInvitationsDiv() {
    return (
      <div className="mt-4">
        <label className="block font-medium text-gray-700">
          Pending Invitations
        </label>
        {pendingInvitations.length > 0 ? (
          <ul className="list-disc pl-6 text-gray-600 text-sm">
            {pendingInvitations.map((user) => (
              <li key={user.id} className="mt-1 flex items-center">
                {user.name}
                {pendingInvitationActionButton(user)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2 text-sm pl-2">
            No Pending Invitations.
          </p>
        )}
      </div>
    );
  }

  function pendingInvitationActionButton(user) {
    return (
      <button
        className={`ml-2 ${
          selectedPendingInvitations.includes(user)
            ? "text-red-500"
            : "text-gray-500"
        }`}
        onClick={() =>
          selectedPendingInvitations.includes(user)
            ? handlePendingInvitationsUndoSelection(user)
            : handleMarkPendingInvitations(user)
        }
      >
        {selectedPendingInvitations.includes(user) ? (
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
            ? handleCollaboratorsUndoSelection(collaborator)
            : handleMarkCollaborators(collaborator)
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
