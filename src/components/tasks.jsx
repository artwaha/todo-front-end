import React, { useCallback, useEffect, useState } from "react";
import SEO from "../components/layout/seo";
import TaskItem from "./task-item";
import SearchBar from "./search-bar";
const taskService = require("../services/task-service");
const userService = require("../services/user-service");

const Tasks = ({ location }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDataTasks = useCallback(async () => {
    try {
      // Refresh the Navbar
      const userId = userService.getLoggedOnUser();
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
  }, [location]);

  useEffect(() => {
    fetchDataTasks();
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
        <p className="mx-auto">Priority </p>
        <p className="mx-auto">Status </p>
      </div>
    );
  }
};

export default Tasks;
