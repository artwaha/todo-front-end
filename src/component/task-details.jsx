import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const taskService = require("../service/task-service");
const collaboratorService = require("../service/collaborator-service");
const userService = require("../service/user-service");

const TaskDetails = () => {
  const [task, setTask] = useState({});
  const [collaborators, setCollaborators] = useState([]);
  const [usersToInvite, setUsersToInvite] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setTask(await taskService.getTaskDetails(1));
        setCollaborators(await collaboratorService.getTaskCollaborators(1, 1));
        setUsersToInvite(await userService.getTaskCollaborators(1, 1));
      } catch (error) {
        console.error({ layer: "VIEW", error });
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {backButton()}
      {taskDetails(task)}
    </>
  );

  function taskDetails() {
    return Object.keys(task).length <= 0 ? (
      <div>Loading</div>
    ) : (
      <div className="p-4">
        <h2 className="flex items-center mb-2">
          <span className="text-3xl font-">{task.title} </span>
          <span className={getStyles()}>{task.priority}</span>
        </h2>
        <p className="text-gray-600 text-lg mb-6">{task.description}</p>

        <p>
          <span>Created By: </span>
          <span className="text-sm text-gray-600">{task.createdBy.name}</span>
        </p>
        {task.updatedBy && (
          <>
            <p>
              <span>Last Updated: </span>
              <span className="text-sm text-gray-600">
                {moment().format(task.lastUpdated)}
              </span>
            </p>
            <p>
              <span>Updated By: </span>
              <span className="text-sm text-gray-600">
                {" "}
                {task.updatedBy.name}
              </span>
            </p>
          </>
        )}

        <h3 className="text-xl font-semibold mt-8">Collaborators:</h3>
        {collaborators.length > 0 ? (
          <ul className="list-disc pl-6 text-gray-600">
            {collaborators.map((collaborator) => (
              <li key={collaborator.id} className="text-gray-700">
                {collaborator.user.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2">No collaborators for this task.</p>
        )}

        <h3 className="text-xl font-semibold mt-8">Users to Invite:</h3>
        {usersToInvite.length > 0 ? (
          <ul className="list-disc pl-6 text-gray-600">
            {usersToInvite.map((user) => (
              <li key={user.id} className="text-gray-700">
                {user.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2">No Users to invite .</p>
        )}
      </div>
    );
  }

  function backButton() {
    return (
      <Link
        to="/tasks"
        className="my-3 text-xs inline-flex items-center px-4 py-2 rounded-md text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-md transition-colors"
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

  function getStyles() {
    return `px-2 py-1 ml-1 font-mono rounded-full ${
      task.priority === "HIGH" ? "text-white bg-[#FF0000]" : "bg-[#00C853]"
    }`;
  }
};

export default TaskDetails;
