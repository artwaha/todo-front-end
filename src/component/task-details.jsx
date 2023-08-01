import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import SEO from "../layout/seo";
import Title from "../layout/title";
const taskService = require("../service/task-service");
const collaboratorService = require("../service/collaborator-service");
const userService = require("../service/user-service");

const TaskDetails = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [mode, setMode] = useState("");
  const [task, setTask] = useState({});
  const [collaborators, setCollaborators] = useState([]);
  const [usersToInvite, setUsersToInvite] = useState([]);
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [collaborator, setcollaborator] = useState({});
  const [title, setTitle] = useState("");

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
  }, [taskId, collaborator]);

  async function handleInvite(user) {
    try {
      await collaboratorService.inviteUser({ userId: user.id, taskId: taskId });
      // To refresh component
      setcollaborator({ userId: user.id, taskId: taskId });
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

  const childContext = {
    task,
    collaborators,
    usersToInvite,
    pendingInvitations,
    handleInvite,
    setMode,
    setTitle,
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
      <div className="flex justify-between items-center mb-4">
        {backButton()}
        <div>
          <label className="text-sm mr-1 font-medium">Mode:</label>
          <select
            onChange={handleChangeMode}
            value={mode}
            className="p-1 border border-green-300 mt-1 text-sm outline-none"
          >
            <option value="view" disabled={mode === "view" ? true : false}>
              View
            </option>
            <option disabled={mode === "edit" ? true : false} value="edit">
              Edit
            </option>
          </select>
        </div>
      </div>
    );
  }

  function backButton() {
    return (
      <Link
        to="/tasks"
        className="text-xs inline-flex items-center p-2 rounded-md text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-md transition-colors"
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
