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
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
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
      } catch (error) {
        console.error({ layer: "VIEW", error });
      }
    }
    fetchData();
    // TODO: update state
  }, [taskId, isLoading]);

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

  const handleSave = () => {
    // Get Dirty fields
    const dirtyFields = Object.keys(formData).filter(
      (key) => formData[key] !== ""
    );

    // Only save the dirty fields
    const updatedFormData = {};
    dirtyFields.forEach((field) => {
      // Convert the status value to boolean
      if (field === "status") {
        updatedFormData[field] = formData[field] === "true";
      } else {
        updatedFormData[field] = formData[field];
      }
    });

    // save the updated form data
    console.log(updatedFormData);
    navigate(`/tasks/${taskId}`);
  };

  const childContext = {
    task,
    collaborators,
    usersToInvite,
    pendingInvitations,
    handleInvite,
    setMode,
    setTitle,
    handleChange,
  };

  return (
    <>
      <SEO title="Task Details" description="Task Details" />
      <Title title={title} />
      {controlButtons()}
      <Outlet context={childContext} />
    </>
  );

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
