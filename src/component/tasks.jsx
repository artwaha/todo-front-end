import React, { useEffect, useState } from "react";
import TaskItem from "./task-item";
import SEO from "../layout/seo";
const taskService = require("../service/task-service");

const Tasks = ({ location }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
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