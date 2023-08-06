import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import SEO from "../layout/seo";
import Title from "../layout/title";
const taskService = require("../service/task-service");
const collaboratorService = require("../service/collaborator-service");
const userService = require("../service/user-service");

const TaskDetails = () => {
  // React Router Variables
  const navigate = useNavigate();
  const { taskId } = useParams();

  // Use state variables
  const [mode, setMode] = useState("");
  const [task, setTask] = useState({});
  const [collaborators, setCollaborators] = useState([]);
  const [usersToInvite, setUsersToInvite] = useState([]);
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [markedCollaborators, setmarkedCollaborators] = useState([]);
  const [selectedUsersToInvite, setSelectedUsersToInvite] = useState([]);
  const [markedUsersToInvite, setmarkedUsersToInvite] = useState([]);
  const [selectedPendingInvitations, setSelectedPendingInvitations] = useState(
    []
  );
  const [markedPendingInvitations, setMarkedPendingInvitations] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isCompleted: "",
    priority: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setTask(await taskService.getTaskDetails(taskId, 1));
        setCollaborators(
          await collaboratorService.getTaskCollaborators(1, taskId)
        );
        setUsersToInvite(await userService.getUsersToInvite(1, taskId));
        setPendingInvitations(
          await userService.getPendingInvitations(1, taskId)
        );
        setIsLoading(false);
      } catch (error) {
        console.error({ layer: "VIEW", error });
      }
    }
    fetchData();
  }, [taskId, isLoading]);

  // Collaborators

  const handleCollaboratorsToggleSelection = (collaborator) => {
    if (selectedCollaborators.includes(collaborator)) {
      setSelectedCollaborators((prevSelected) =>
        prevSelected.filter((c) => c !== collaborator)
      );
    } else {
      setSelectedCollaborators((prevSelected) => [
        ...prevSelected,
        collaborator,
      ]);
    }
  };

  const handleMarkCollaborators = (collaborator) => {
    setmarkedCollaborators((prevMarked) => [...prevMarked, collaborator]);
    handleCollaboratorsToggleSelection(collaborator);
  };

  const handleCollaboratorsUndoSelection = (collaborator) => {
    setmarkedCollaborators((prevMarked) =>
      prevMarked.filter((c) => c !== collaborator)
    );
    handleCollaboratorsToggleSelection(collaborator);
  };

  // Users to Invite

  const handleUsersToInviteToggleSelection = (userToInvite) => {
    if (selectedUsersToInvite.includes(userToInvite)) {
      setSelectedUsersToInvite((prevSelected) =>
        prevSelected.filter((c) => c !== userToInvite)
      );
    } else {
      setSelectedUsersToInvite((prevSelected) => [
        ...prevSelected,
        userToInvite,
      ]);
    }
  };

  const handleMarkUsersToInvite = (userToInvite) => {
    setmarkedUsersToInvite((prevMarked) => [...prevMarked, userToInvite]);
    handleUsersToInviteToggleSelection(userToInvite);
  };

  const handleUsersToInviteUndoSelection = (userToInvite) => {
    setmarkedUsersToInvite((prevMarked) =>
      prevMarked.filter((c) => c !== userToInvite)
    );
    handleUsersToInviteToggleSelection(userToInvite);
  };

  // Pending Invitations

  const handlePendingInvitationsToggleSelection = (PendingInvitation) => {
    if (selectedPendingInvitations.includes(PendingInvitation)) {
      setSelectedPendingInvitations((prevSelected) =>
        prevSelected.filter((c) => c !== PendingInvitation)
      );
    } else {
      setSelectedPendingInvitations((prevSelected) => [
        ...prevSelected,
        PendingInvitation,
      ]);
    }
  };

  const handleMarkPendingInvitations = (PendingInvitation) => {
    setMarkedPendingInvitations((prevMarked) => [
      ...prevMarked,
      PendingInvitation,
    ]);
    handlePendingInvitationsToggleSelection(PendingInvitation);
  };

  const handlePendingInvitationsUndoSelection = (PendingInvitation) => {
    setMarkedPendingInvitations((prevMarked) =>
      prevMarked.filter((c) => c !== PendingInvitation)
    );
    handlePendingInvitationsToggleSelection(PendingInvitation);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  async function handleInvite(user) {
    try {
      setIsLoading(true);
      await collaboratorService.inviteUser({ userId: user.id, taskId: taskId });
      // To refresh component
      setIsLoading(false);
    } catch (error) {
      console.error({ layer: "VIEW", error });
    }
  }

  const handleChangeMode = (e) => {
    switch (e.target.value) {
      case "edit":
        navigate("edit");
        break;
      default:
        navigate(`/tasks/${taskId}`);
        break;
    }
  };

  function getFormData() {
    // Get Dirty fields
    const dirtyFields = Object.keys(formData).filter(
      (key) => formData[key] !== ""
    );

    // Only save the dirty fields
    const updatedFormData = {};
    dirtyFields.forEach((field) => {
      updatedFormData[field] = formData[field];
    });

    return updatedFormData;
  }

  const handleSave = async () => {
    const updatedFormData = getFormData();
    if (
      !markedCollaborators.length &&
      !markedPendingInvitations.length &&
      !markedUsersToInvite.length &&
      !Object.keys(updatedFormData).length
    ) {
      // If no field has chaged
      alert("Nothing Changed!");
    } else {
      setIsLoading(true);

      if (markedCollaborators.length) {
        console.log("Collaborators: ", markedCollaborators);
      }

      if (markedPendingInvitations.length) {
        console.log("Pending Invitations:", markedPendingInvitations);
      }

      if (markedUsersToInvite.length) {
        console.log("Users to invite: ", markedUsersToInvite);
      }

      if (Object.keys(updatedFormData).length) {
        // Convert isCompleted to boolean
        updatedFormData.isCompleted = JSON.parse(updatedFormData.isCompleted);
        // updatedFormData.isCompleted = updatedFormData.isCompleted === "true";

        // console.log("Form Data: ", updatedFormData);
        await taskService.updateTask(updatedFormData, taskId, 1);
      }

      setIsLoading(false);
      navigate(`/tasks/${taskId}`);
    }
  };

  const childContext = {
    task,
    collaborators,
    usersToInvite,
    pendingInvitations,
    selectedUsersToInvite,
    selectedCollaborators,
    selectedPendingInvitations,
    handleInvite,
    setMode,
    setTitle,
    handleChange,
    handleCollaboratorsUndoSelection,
    handleMarkCollaborators,
    handleMarkUsersToInvite,
    handleUsersToInviteUndoSelection,
    handleMarkPendingInvitations,
    handlePendingInvitationsUndoSelection,
  };

  return (
    <>
      <SEO title="Task Details" description="Task Details" />
      <Title title={title} />
      {controlButtons()}
      {renderOutlet()}
    </>
  );

  function renderOutlet() {
    if (isLoading) {
      return <div>Loading task details...</div>;
    } else {
      if (Object.keys(task).length <= 0) {
        return <div>No Task details found</div>;
      } else {
        return <Outlet context={childContext} />;
      }
    }
  }

  function controlButtons() {
    return (
      <div className="flex items-center mb-4">
        {backButton()}
        {saveButton()}
        {modeButton()}
      </div>
    );
  }

  function modeButton() {
    return (
      <select
        onChange={handleChangeMode}
        value={mode}
        className="outline-none mr-2 text-xs inline-flex items-center p-2 rounded-md text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-md transition-colors"
      >
        <option value="view" className="text-black">
          View Mode
        </option>
        <option value="edit" className="text-black">
          Edit Mode
        </option>
      </select>
    );
  }

  function saveButton() {
    return (
      mode === "edit" && (
        <button
          onClick={handleSave}
          className="mr-2 text-xs inline-flex items-center p-2 rounded-md text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-md transition-colors"
        >
          Save
        </button>
      )
    );
  }

  function backButton() {
    return (
      <Link
        to="/tasks"
        className="mr-auto text-xs inline-flex items-center p-2 rounded-md text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-md transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4 mr-2 -ml-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back
      </Link>
    );
  }
};

export default TaskDetails;
