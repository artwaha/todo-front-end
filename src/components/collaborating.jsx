import React, { useEffect, useState } from "react";
import SEO from "./layout/seo";
import TaskItem from "./task-item";
import SearchBar from "./search-bar";
const taskService = require("../services/task-service");
const userService = require("../services/user-service");

const Collaborating = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [collaboratingTasks, setCollaboratingTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDataCollaborating = async () => {
    const userId = userService.getLoggedOnUserId();
    setIsLoading(true);
    setCollaboratingTasks(await taskService.getCollaboratingTasks(userId));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataCollaborating();
  }, []);

  const filteredTasks = collaboratingTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SEO title="Collaborating" description="Collaborating" />
      {collaboratingTasks.length !== 0 && (
        <SearchBar
          searchQuery={searchQuery}
          updateSearchQuery={setSearchQuery}
        />
      )}
      {renderCollaboratingTasks()}
    </div>
  );

  function renderCollaboratingTasks() {
    if (isLoading) {
      return <div>Loading</div>;
    } else {
      return filteredTasks.length <= 0 ? (
        <div className="p-2 text-center"> No Invitations found</div>
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
