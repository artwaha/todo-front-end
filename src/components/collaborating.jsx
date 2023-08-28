import React, { useEffect, useState } from "react";
import SEO from "./layout/seo";
import TaskItem from "./task-item";
const taskService = require("../services/task-service");

const Collaborating = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [collaboratingTasks, setCollaboratingTasks] = useState([]);

  const fetchDataCollaborating = async () => {
    setIsLoading(true);
    setCollaboratingTasks(await taskService.getCollaboratingTasks(1));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataCollaborating();
  }, []);

  return (
    <div>
      <SEO title="Collaborating" description="Collaborating" />
      {renderCollaboratingTasks()}
    </div>
  );

  function renderCollaboratingTasks() {
    if (isLoading) {
      return <div>Loading</div>;
    } else {
      return collaboratingTasks.length <= 0 ? (
        <div> No Invitations</div>
      ) : (
        <>
          {titleBar()}
          {collaboratingTasks.map((task, index) => (
            <TaskItem task={task} key={index} />
          ))}
        </>
      );
    }
  }
};

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

export default Collaborating;
