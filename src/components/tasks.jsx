import React, { useEffect, useState } from "react";
import SEO from "../components/layout/seo";
import TaskItem from "./task-item";
import Navbar from "./layout/navbar";
const taskService = require("../services/task-service");

const Tasks = ({ location }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Refresh the Navbar
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
    }
    fetchData();
  }, [location]);

  return (
    <>
      {seo()}
      {/* <hr /> */}
      {displayTasks()}
    </>
  );

  function displayTasks() {
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
        style={{ gridTemplateColumns: "1fr 2fr 1fr 1fr" }}
      >
        <p className="">#</p>
        <p>Title</p>
        <p className="mx-auto">Priority </p>
      </div>
    );
  }
};

export default Tasks;
