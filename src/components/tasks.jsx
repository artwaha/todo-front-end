import React, { useCallback, useEffect, useState } from "react";
import SEO from "../components/layout/seo";
import TaskItem from "./task-item";
import SearchBar from "./search-bar";
import { Link } from "react-router-dom";
const taskService = require("../services/task-service");
const userService = require("../services/user-service");

const Tasks = ({ location }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDataTasks = useCallback(
    async (userId) => {
      try {
        setIsLoading(true);
        switch (location) {
          case "Done":
            setTasks(await taskService.getDoneTasks(userId));
            break;
          case "Pending":
            setTasks(await taskService.getPendingTasks(userId));
            break;
          default:
            setTasks(await taskService.getAllTasks(userId));
            break;
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
        console.error({ layer: "VIEW", error: error });
      }
    },
    [location]
  );

  useEffect(() => {
    const userId = userService.getLoggedOnUserId();
    fetchDataTasks(userId);
  }, [fetchDataTasks]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {seo()}
      {tasks.length !== 0 && (
        <SearchBar
          searchQuery={searchQuery}
          updateSearchQuery={setSearchQuery}
        />
      )}
      <div
        className={`flex items-center text-xs ${
          tasks.length !== 0 ? "justify-end" : "justify-center"
        }`}
      >
        <Link
          to="/tasks/new-task"
          className="bg-black text-white px-3 py-2 outline-none w-fit rounded-full flex items-center"
        >
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1.5em"
            width="1.5em"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={40}
              d="M256 112v288M400 256H112"
            />
          </svg>
          New task
        </Link>
      </div>
      {displayTasks()}
    </>
  );

  function displayTasks() {
    if (isLoading) {
      return <div>Loading</div>;
    } else {
      return filteredTasks.length <= 0 ? (
        <div className="p-2 text-center">
          No {location !== "All" && location} Tasks Found
        </div>
      ) : (
        <>
          {titleBar()}
          {filteredTasks.map((task, index) => (
            <TaskItem task={task} key={index} />
          ))}
        </>
      );
    }
  }

  function seo() {
    if (location === "Done") {
      return <SEO title="Done Tasks" description="Done Tasks" />;
    } else if (location === "Pending") {
      return <SEO title="Pending Tasks" description="Pending Tasks" />;
    } else if (location === "invitations") {
      return <SEO title="Invitations" description="Invitations" />;
    } else {
      return <SEO title="All Tasks" description="All Tasks" />;
    }
  }

  function titleBar() {
    return (
      <div
        className="grid font-bold p-2"
        style={{ gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr" }}
      >
        <p className="">#</p>
        <p>Title</p>
        <p>Priority </p>
        <p>Status </p>
      </div>
    );
  }
};

export default Tasks;
