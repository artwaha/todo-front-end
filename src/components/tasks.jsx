import React, { useCallback, useEffect, useState } from "react";
import SEO from "../components/layout/seo";
import TaskItem from "./task-item";
import SearchBar from "./search-bar";
const taskService = require("../services/task-service");

const Tasks = ({ location }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataTasks = useCallback(async () => {
    try {
      // Refresh the Navbar
      setIsLoading(true);
      switch (location) {
        case "Done":
          setTasks(await taskService.getDoneTasks(1));
          break;
        case "Pending":
          setTasks(await taskService.getPendingTasks(1));
          break;
        default:
          setTasks(await taskService.getAllTasks(1));
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

  return (
    <>
      {seo()}
      <SearchBar tasks={tasks} setTasks={setTasks} />
      {displayTasks()}
    </>
  );

  function displayTasks() {
    if (isLoading) {
      return <div>Loading</div>;
    } else {
      return tasks.length <= 0 ? (
        <div>No {location !== "All" && location} Tasks</div>
      ) : (
        <>
          {titleBar()}
          {tasks.map((task, index) => (
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
