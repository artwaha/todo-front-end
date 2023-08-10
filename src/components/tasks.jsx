import React, { useEffect, useState } from "react";
import TaskItem from "./task-item";
import SEO from "../components/layout/seo";
import Title from "../components/layout/title";
const taskService = require("../services/task-service");

const Tasks = ({ location }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetchData() {
      switch (location) {
        case "Done":
          setTitle("Done Tasks");
          setTasks(await taskService.getDoneTasks(1));
          break;
        case "Pending":
          setTitle("Pending Tasks");
          setTasks(await taskService.getPendingTasks(1));
          break;
        case "invitations":
          setTitle("Invitations");
          setTasks(await taskService.getPendingTasks(1));
          break;
        default:
          setTitle("All Tasks (Completed & Pending)");
          setTasks(await taskService.getAllTasks(1));
          break;
      }
    }
    fetchData();
  }, [location]);

  return (
    <>
      <Title title={title} />
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
