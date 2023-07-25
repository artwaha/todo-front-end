import React, { useEffect, useState } from "react";
import TaskItem from "./task-item";
import SEO from "../layout/seo";
const taskService = require("../service/task-service");

const Tasks = ({ location }) => {
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      switch (location) {
        case "Done":
          setData(await taskService.getDoneTasks());
          // console.log("Done");
          break;
        case "Pending":
          setData(await taskService.getPendingTasks());
          // console.log("Pending");
          break;
        default:
          setData(await taskService.getAllTasks());
          // console.log("All");
          break;
      }
    }
    fetchData();
  }, [location]);

  const fetchTasks = () => {
    if (location === "Done") {
      return taskService
        .getDoneTasks()
        .map((task, index) => <TaskItem task={task} key={index} />);
    } else if (location === "Pending") {
      return taskService
        .getPendingTasks()
        .map((task, index) => <TaskItem task={task} key={index} />);
    } else {
      return taskService
        .getAllTasks()
        .map((task, index) => <TaskItem task={task} key={index} />);
    }
  };

  return (
    <>
      {seo()}
      {/* {displayTasks()} */}

      {}
    </>
  );

  function displayTasks() {
    return fetchTasks().length <= 0 ? (
      // Return location only when location != All i.e. when location is Done or Pending
      <div>No {location !== "All" && location} Tasks</div>
    ) : (
      <>
        {titleBar()}
        {fetchTasks()}
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
