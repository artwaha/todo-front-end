import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SEO from "./layout/seo";
import RejectItem from "./reject-item";
import SearchBar from "./search-bar";
const taskService = require("../services/task-service");
const collaboratorService = require("../services/collaborator-service");

const Rejected = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rejectedTasks, setRejectedTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { fetchDataNavBar } = useOutletContext();

  useEffect(() => {
    fetchDataRejected();
  }, []);

  const fetchDataRejected = async () => {
    setIsLoading(true);
    setRejectedTasks(await taskService.getRejectedTasks(1));
    // console.log(await taskService.getRejectedTasks(1));
    setIsLoading(false);
  };

  const filteredTasks = rejectedTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAccept = async (data) => {
    const collaborator = { userId: 1, taskId: data.id };
    await collaboratorService.addCollaborator(collaborator);
    // Refresh/reload the component(s)
    fetchDataRejected();
    fetchDataNavBar();
  };

  return (
    <div>
      <SEO description="Rejected" title="Rejected" />
      {rejectedTasks.length !== 0 && (
        <SearchBar
          searchQuery={searchQuery}
          updateSearchQuery={setSearchQuery}
        />
      )}
      {renderRejectedTasks()}
    </div>
  );

  function titleBar() {
    return (
      <div
        className="grid font-bold p-2"
        style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
      >
        <p className="">#</p>
        <p>Title</p>
        <p className="mx-auto">Action</p>
      </div>
    );
  }

  function renderRejectedTasks() {
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      return filteredTasks.length <= 0 ? (
        <div>No Rejected Tasks</div>
      ) : (
        <div>
          {titleBar()}
          {filteredTasks.map((task, index) => (
            <RejectItem key={index} task={task} handleAccept={handleAccept} />
          ))}
        </div>
      );
    }
  }
};

export default Rejected;
